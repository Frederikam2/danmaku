import controls from "../control.js";

const module = {};

module.entity = new createjs.Shape();
module.entity.graphics.beginFill("cyan").drawCircle(0, 0, 10);
let ticksSinceLastShot = 0;
let stage;
module.bullets = [];
let dead = false;

function shoot() {
  if (dead) return;
  const bulletEntity = new createjs.Shape();
  bulletEntity.graphics.beginFill("red").drawCircle(0, 0, 4);
  bulletEntity.x = module.entity.x;
  bulletEntity.y = module.entity.y;
  stage.addChild(bulletEntity);

  module.bullets.push(bulletEntity);
}

module.tick = function () {
  const input = controls.getInput();
  const speed = 4.5;
  if (input.lfHeld) module.entity.x -= speed;
  if (input.rtHeld) module.entity.x += speed;
  if (input.fwdHeld) module.entity.y -= speed;
  if (input.bckHeld) module.entity.y += speed;

  module.entity.x = Math.max(module.entity.x, 0);
  module.entity.y = Math.max(module.entity.y, 0);
  module.entity.x = Math.min(module.entity.x, document.getElementById("game").width);
  module.entity.y = Math.min(module.entity.y, document.getElementById("game").height);

  if (input.shootHeld && ticksSinceLastShot > 5) {
    shoot();
    ticksSinceLastShot = 0;
  } else {
    ticksSinceLastShot++;
  }

  let newArray = [];

  module.bullets.forEach(function(ent){
    ent.y -= 20;

    if (ent.y > 0) {
      newArray.push(ent)
    } else {
      stage.removeChild(ent)
    }
  });

  module.bullets = newArray;
};

module.init = function(s) {
  stage = s;
  module.entity.x = document.getElementById("game").width / 2;
  module.entity.y = document.getElementById("game").height - 100;

  // Remove any remaining bullets from the stage
  module.bullets.forEach(function (bullet) {
    stage.removeChild(bullet);
  });

  module.bullets = [];
  dead = false;
  stage.addChild(module.entity);
};

module.takeHit = function() {
  dead = true;
  stage.removeChild(module.entity);
};

export default module;

import controls from "../control.js";

const module = {};

const entity = new createjs.Shape();
entity.graphics.beginFill("cyan").drawCircle(0, 0, 15);
let ticksSinceLastShot = 0;
let stage;
module.bullets = [];

function shoot() {
  const bulletEntity = new createjs.Shape();
  bulletEntity.graphics.beginFill("red").drawCircle(0, 0, 4);
  bulletEntity.x = entity.x;
  bulletEntity.y = entity.y;
  stage.addChild(bulletEntity);

  module.bullets.push(bulletEntity);
}

module.tick = function () {
  const input = controls.getInput();
  const speed = 5;
  if (input.lfHeld) entity.x -= speed;
  if (input.rtHeld) entity.x += speed;
  if (input.fwdHeld) entity.y -= speed;
  if (input.bckHeld) entity.y += speed;

  entity.x = Math.max(entity.x, 0);
  entity.y = Math.max(entity.y, 0);
  entity.x = Math.min(entity.x, document.getElementById("game").width);
  entity.y = Math.min(entity.y, document.getElementById("game").height);

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
  entity.x = document.getElementById("game").width / 2;
  entity.y = document.getElementById("game").height - 100;
  stage.addChild(entity);
};

export default module;

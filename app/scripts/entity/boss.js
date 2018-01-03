import main from '../main.js'

module = {};

let stage;
const startHealth = 70;
let health = startHealth;
let dead = false;
module.sprawls = [];

module.sprawlBurstDual = function() {
  module.sprawlBurst(15, 4500, 0.3);
  module.sprawlBurst(15, 4500, -0.3);
};

module.sprawlBurst = function (bullets, time, rotationModifier) {
  if (dead) return;

  let con = new createjs.Container();

  const angleStep = (2 * Math.PI) / bullets;
  let curAngle = Math.random(); // With a hint of random
  for (let i = 0; i < bullets; i++) {
    let bullet = new createjs.Shape();
    bullet.graphics.beginFill('purple').drawCircle(0, 0, 5);

    const endPoint = {
      x: Math.cos(curAngle) * 1000,
      y: Math.sin(curAngle) * 1000
    };

    createjs.Tween.get(bullet)
      .to(endPoint, time);

    con.addChild(bullet);

    curAngle += angleStep;
  }

  con.x = module.entity.x;
  con.y = module.entity.y;

  createjs.Tween.get(con)
    .to({rotation: 90 * rotationModifier}, 5000)
    .call(function () {
      stage.removeChild(con);
    });

  stage.addChild(con);
  module.sprawls.push(con);
};

module.newBoss = function (s) {
  stage = s;

  // Clean up after the last boss
  if (module.entity !== undefined) {
    stage.removeChild(module.entity);
    createjs.Tween.removeTweens(module.entity);

    module.sprawls.forEach(function (container) {
      stage.removeChild(container);
    });

    module.sprawls = [];
  }

  module.entity = new createjs.Shape();
  module.entity.graphics.beginFill('cyan').drawRect(-20, -20, 40, 40);
  module.entity.x = document.getElementById('game').width/2;
  module.entity.y = 200;
  health = startHealth;
  dead = false;
  stage.addChild(module.entity);

  module.act();
};

let currentPoint = 7;

module.act = function() {
  let canvas = document.getElementById("game");

  const w = canvas.width;
  const oldPoint = currentPoint;

  const points = [
    {x: 50, y: 50}, {x: w/2, y: 50}, {x: w - 50, y: 50},
    {x: 50, y: 100},{x: w/2, y: 100},{x: w - 50, y: 100},
    {x: 50, y: 200},{x: w/2, y: 200},{x: w - 50, y: 200},
  ];

  // Make sure we always move a column
  while (oldPoint % 3 === currentPoint % 3) {
    currentPoint = Math.floor(Math.random() * points.length);
  }

  let moveTime = 100 + health * 10;
  let restTime = 100 + health * 30;

  let rot = 0;
  if (module.entity.x < w/2) rot = 1;
  else if (module.entity.x > w/2) rot = -1;

  const attack = function() {
    if (health <= 30) {
      module.sprawlBurstDual();
    } else if (health <= 50) {
      module.sprawlBurst(60, 5000, rot);
    } else {
      module.sprawlBurst(40, 5000, rot);
    }
  };

  const secondAttack = function() {
    if (health <= 20) {
      module.sprawlBurst(40-health, 3000,
        health <= 10 ? rot * 2 : rot);
    }
  };

  createjs.Tween.get(module.entity)
    .to(points[currentPoint], moveTime)
    .wait(restTime*0.25)
    .call(attack)
    .wait(restTime*0.50)
    .call(secondAttack)
    .wait(restTime*0.25)
    .call(module.act);
};

module.takeHit = function() {
  health--;
  console.log(health);
  if (health <= 0) {
    dead = true;
    main.stage.removeChild(module.entity);
    module.entity.y = -1000
  }
};

export default module;

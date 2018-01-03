import main from '../main.js'

module = {};

let stage;
let health = 50;
let dead = false;
let sprawls = [];

module.sprawlBurstDual = function() {
  module.sprawlBurst(10, 0.3);
  module.sprawlBurst(10, -0.3);
};

module.sprawlBurst = function (bullets, rotationModifier) {
  if (dead) return;

  let con = new createjs.Container();

  if (bullets === undefined) {
    rotationModifier = 40;
  }

  if (rotationModifier === undefined) {
    rotationModifier = 1;
  }

  const angleStep = (2 * Math.PI) / 40;
  let curAngle = Math.random(); // With a hint of random
  for (let i = 0; i < 40; i++) {
    let bullet = new createjs.Shape();
    bullet.graphics.beginFill('purple').drawCircle(0, 0, 5);

    const endPoint = {
      x: Math.cos(curAngle) * 1000,
      y: Math.sin(curAngle) * 1000
    };

    createjs.Tween.get(bullet)
      .to(endPoint, 5000);

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
};

module.newBoss = function (s) {
  stage = s;
  module.entity = new createjs.Shape();
  module.entity.graphics.beginFill('cyan').drawRect(-20, -20, 40, 40);
  module.entity.x = document.getElementById('game').width/2;
  module.entity.y = 200;
  stage.addChild(module.entity);

  let canvas = document.getElementById("game");



  const points = [
    {x: canvas.width - 50, y: 50},
    {x: 50, y: 50},
    {x: canvas.width / 2, y: 200},
  ];

  createjs.Tween.get(module.entity, {loop: true})
    .wait(500)
    .call(module.sprawlBurst)
    .wait(500)
    .call(module.sprawlBurstDual)
    .to(points[0], 800, createjs.Ease.sineInOut(2))
    .wait(500)
    .call(module.sprawlBurst)
    .wait(500)
    .call(module.sprawlBurstDual)
    .to(points[1], 1000, createjs.Ease.sineInOut(2))
    .wait(500)
    .call(module.sprawlBurst)
    .wait(500)
    .call(module.sprawlBurstDual)
    .to(points[2], 800, createjs.Ease.sineInOut(2));
};

module.takeHit = function() {
  dead = true;
  health--;
  if (health <= 0) {
    main.stage.removeChild(module.entity);
    module.entity.y = -1000
  }
};

export default module;

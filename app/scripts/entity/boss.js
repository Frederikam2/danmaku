import main from '../main.js'

module = {};

let health = 50;

module.newBoss = function (stage) {
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
    .wait(5000)
    .to(points[0], 1000, createjs.Ease.sineInOut(2))
    .wait(5000)
    .to(points[1], 1000, createjs.Ease.sineInOut(2))
    .wait(5000)
    .to(points[2], 1000, createjs.Ease.sineInOut(2));

  function handleComplete() {
    //Tween complete
  }
};

module.takeHit = function() {
  health--;
  if (health <= 0) {
    main.stage.removeChild(module.entity);
    module.entity.y = -1000
  }
};

export default module;

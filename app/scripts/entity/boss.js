module = {};

let health = 100;

module.newBoss = function (stage) {
  module.entity = new createjs.Shape();
  module.entity.graphics.beginFill('cyan').drawRect(-20, -20, 40, 40);
  module.entity.x = document.getElementById('game').width/2;
  module.entity.y = 100;
  stage.addChild(module.entity);
};

module.takeHit = function() {

};

export default module;

import main from '../main.js'

module = {};

let health = 50;

module.newBoss = function (stage) {
  module.entity = new createjs.Shape();
  module.entity.graphics.beginFill('cyan').drawRect(-20, -20, 40, 40);
  module.entity.x = document.getElementById('game').width/2;
  module.entity.y = 100;
  stage.addChild(module.entity);
};

module.takeHit = function() {
  health--;
  if (health <= 0) {
    main.stage.removeChild(module.entity);
    module.entity.y = -1000
  }
};

export default module;

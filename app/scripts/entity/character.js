import controls from "../control.js";

const module = {};

const obj = new createjs.Shape();
obj.graphics.beginFill("cyan").drawCircle(0, 0, 20);
obj.x = 500;
obj.y = 1400;

module.tick = function () {
  const input = controls.getInput();
  const speed = 20;
  if (input.lfHeld) obj.x -= speed;
  if (input.rtHeld) obj.x += speed;
  if (input.fwdHeld) obj.y -= speed;
  if (input.bckHeld) obj.y += speed;

  obj.x = Math.max(obj.x, 0);
  obj.y = Math.max(obj.y, 0);
  obj.x = Math.min(obj.x, document.getElementById("game").width);
  obj.y = Math.min(obj.y, document.getElementById("game").height);
};

module.init = function(stage) {
  stage.addChild(obj);
};

export default module;

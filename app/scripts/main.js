import character from "./entity/character.js";
import boss from "./entity/boss.js";
import physics from "./physics.js";

module = {};

function init() {
  const stage = new createjs.Stage("game");
  module.stage = stage;
  character.init(stage);
  createjs.Ticker.framerate = 60;
  boss.newBoss(stage);
  createjs.Ticker.addEventListener("tick", character.tick);
  createjs.Ticker.addEventListener("tick", physics.tick);
  createjs.Ticker.addEventListener("tick", stage);
}

window.onload = init;

export default module;

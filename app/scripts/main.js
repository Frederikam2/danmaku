import character from "./entity/character.js";

function onTick() {
}

function init() {
  const stage = new createjs.Stage("game");
  character.init(stage);
  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener("tick", character.tick);
  createjs.Ticker.addEventListener("tick", onTick);
  createjs.Ticker.addEventListener("tick", stage);
}

window.onload = init;

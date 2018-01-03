import character from "./entity/character.js";
import boss from "./entity/boss.js";
import physics from "./physics.js";

module = {};

let textContainer = new createjs.Container();

function init() {
  let canvas = document.getElementById("game");
  module.stage = new createjs.Stage("game");

  const title = new createjs.Text("Danmaku", "bold 42px sans", "#fff");
  title.x = canvas.width/2;
  title.y = 200;
  title.textAlign = "center";

  const controls = new createjs.Text("WASD or arrow keys to move", "20px sans-serif", "#ffffff");
  controls.x = canvas.width/2;
  controls.y = 250;
  controls.textAlign = "center";

  const shoot = new createjs.Text("Space to shoot", "20px sans-serif", "#ffffff");
  shoot.x = canvas.width/2;
  shoot.y = 280;
  shoot.textAlign = "center";

  const restart = new createjs.Text("\'R\' to restart", "20px sans-serif", "#ffffff");
  restart.x = canvas.width/2;
  restart.y = 310;
  restart.textAlign = "center";

  const anyKeyStart = new createjs.Text("Press any key to start", "32px VT323", "#ffffff");
  anyKeyStart.x = canvas.width/2;
  anyKeyStart.y = 380;
  anyKeyStart.textAlign = "center";

  createjs.Tween.get(anyKeyStart, {loop: true})
    .to({alpha: 0.4}, 500);

  textContainer.addChild(title);
  textContainer.addChild(controls);
  textContainer.addChild(shoot);
  textContainer.addChild(restart);
  textContainer.addChild(anyKeyStart);
  module.stage.addChild(textContainer);
  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener("tick", module.stage);
}

module.start = function() {
  module.stage.removeChild(textContainer);
  character.init(module.stage);
  boss.newBoss(module.stage);
  createjs.Ticker.addEventListener("tick", character.tick);
  createjs.Ticker.addEventListener("tick", physics.tick);
};

module.restart = function() {
  console.log("Restarting the game");
  boss.newBoss(module.stage);
  character.init(module.stage);
};

window.onload = init;

export default module;

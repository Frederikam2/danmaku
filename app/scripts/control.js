import main from './main.js'

const KEYCODE_SPACE = 32;
const KEYCODE_UP = 38;
const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;
const KEYCODE_DOWN = 40;
const KEYCODE_W = 87;
const KEYCODE_A = 65;
const KEYCODE_S = 83;
const KEYCODE_D = 68;
const KEYCODE_R = 82;

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

let controls = {
  shootHeld: false,
  lfHeld: false,
  rtHeld: false,
  fwdHeld: false,
  bckHeld: false
};

function handleKeyDown(e) {
  //cross browser issues exist
  if (!e) {
    e = window.event;
  }

  //console.log(e);

  switch (e.keyCode) {
    case KEYCODE_SPACE:
      controls.shootHeld = true;
      return false;
    case KEYCODE_A:
    case KEYCODE_LEFT:
      controls.lfHeld = true;
      return false;
    case KEYCODE_D:
    case KEYCODE_RIGHT:
      controls.rtHeld = true;
      return false;
    case KEYCODE_W:
    case KEYCODE_UP:
      controls.fwdHeld = true;
      return false;
    case KEYCODE_S:
    case KEYCODE_DOWN:
      controls.bckHeld = true;
      return false;
  }
}

function handleKeyUp(e) {
  //cross browser issues exist
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case KEYCODE_SPACE:
      controls.shootHeld = false;
      return false;
    case KEYCODE_A:
    case KEYCODE_LEFT:
      controls.lfHeld = false;
      return false;
    case KEYCODE_D:
    case KEYCODE_RIGHT:
      controls.rtHeld = false;
      return false;
    case KEYCODE_W:
    case KEYCODE_UP:
      controls.fwdHeld = false;
      return false;
    case KEYCODE_S:
    case KEYCODE_DOWN:
      controls.bckHeld = false;
      return false;
    case KEYCODE_R:
      main.restart();
      return false;
  }
}
let module = {};
module.getInput = function() {
  return controls;
};

export default module;

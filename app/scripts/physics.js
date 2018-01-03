import character from './entity/character.js';
import boss from './entity/boss.js';
import main from './main.js';

module = {};

module.tick = function () {
  const bossUpperX = boss.entity.x - 32;
  const bossLowerX = boss.entity.x + 32;
  const bossUpperY = boss.entity.y - 32;
  const bossLowerY = boss.entity.y + 32;

  character.bullets.forEach(function (ent) {
    if (ent.x >= bossUpperX && ent.x <= bossLowerX
      && ent.y >= bossUpperY && ent.y <= bossLowerY) {
      ent.y = -100;
      main.stage.removeChild(ent);
      boss.takeHit();
    }
  });
};

export default module;

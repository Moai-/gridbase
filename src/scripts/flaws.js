import { isEnemy } from "./utils";

export const flawsDict = {
  "can't stand the agidzar": cantStandTheAgidzar,
};

function cantStandTheAgidzar(character, game) {
  /*
    probably the most rudimentary version of this is:
    if there's an enemy in this character's control zone
    display the check if this applies message

    */
  let message = null;
  const enemyChars = character
    .getControlZoneTiles(game)
    .filter((tile) => isEnemy(tile, character.player));
  if (enemyChars.length > 0) {
    message = "test";
  }

  return message;
}

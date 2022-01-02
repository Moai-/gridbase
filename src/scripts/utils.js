export const numToAlpha = (num) => {
  let letters = "";
  while (num >= 0) {
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[num % 26] + letters;
    num = Math.floor(num / 26) - 1;
  }
  return letters;
};

export const convertX = (num) => num + 1;

export const convertY = numToAlpha;

export const isEmptyTile = (tile) => tile === null;

export const isInvalidTile = (tile) => tile === -1;

export const isCharacter = (tile) =>
  !isEmptyTile(tile) && !isInvalidTile(tile) && tile.name;

export const isEnemy = (tile, curChar) =>
  isCharacter(tile) && tile.player !== curChar.player;

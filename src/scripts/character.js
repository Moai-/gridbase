import { flawsDict } from "./flaws";
import { isEmptyTile } from "./utils";

const directions = ["left", "up", "right", "down"];

export class Character {
  constructor(player, name, x, y, color = "red", flaw1, flaw2) {
    this.player = player;
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
    this.selected = false;
    this.direction = "down";
    this.stats = {
      vitality: 1,
      movement: 1,
      strength: 1,
    };
    this.currentStats = {
      vitality: 1,
      movement: 1,
      strength: 1,
    };
    this.flaw1 = flaw1;
    this.flaw2 = flaw2;
  }

  getAdjacentTiles(game) {
    return game.getCellsAround(this.name);
  }

  getControlZoneTiles(game) {
    const cardinals = game.getCellsAroundDirs(this.name);
    switch (this.direction) {
      case "up":
        return [cardinals.NW, cardinals.N, cardinals.NE];
      case "left":
        return [cardinals.NW, cardinals.W, cardinals.SW];
      case "right":
        return [cardinals.NE, cardinals.E, cardinals.SE];
      default:
        return [cardinals.SW, cardinals.S, cardinals.SE];
    }
  }

  turn(direction, game) {
    const curIdx = directions.indexOf(this.direction);
    let nextIdx = 0;
    if (direction === "left") {
      nextIdx = curIdx + 1 === directions.length ? 0 : curIdx + 1;
    } else {
      nextIdx = curIdx - 1 < 0 ? directions.length - 1 : curIdx - 1;
    }
    game.turnCharacter(this.name, directions[nextIdx]);
  }

  move(cardinal, game) {
    const moveTo = (x, y) => {
      if (!isEmptyTile(game.gridAt(x, y))) return;
      game.moveCharacter(this.name, x, y);
    };
    switch (cardinal) {
      case "NW":
        moveTo(this.x - 1, this.y - 1);
        break;
      case "N":
        moveTo(this.x, this.y - 1);
        break;
      case "NE":
        moveTo(this.x + 1, this.y - 1);
        break;
      case "E":
        moveTo(this.x + 1, this.y);
        break;
      case "W":
        moveTo(this.x - 1, this.y);
        break;
      case "SW":
        moveTo(this.x - 1, this.y + 1);
        break;
      case "S":
        moveTo(this.x, this.y + 1);
        break;
      case "SE":
        moveTo(this.x + 1, this.y + 1);
        break;
      default:
        break;
    }
  }

  getLOS(game) {
    const { x, y, direction } = this;
    const max = game.getGridDimensions();
    let entities = [];
    switch (direction) {
      case "up":
        for (let curY = y - 1; curY >= 0; curY--) {
          entities = [...entities, ...game.getRow(curY)];
        }
        break;
      case "left":
        for (let curX = x - 1; curX >= 0; curX--) {
          entities = [...entities, ...game.getCol(curX)];
        }

        break;
      case "right":
        for (let curX = x + 1; curX < max.x; curX++) {
          entities = [...entities, ...game.getCol(curX)];
        }
        break;
      default:
        for (let curY = y + 1; curY < max.y; curY++) {
          entities = [...entities, ...game.getRow(curY)];
        }
        break;
    }
    return entities.filter((tile) => !isEmptyTile(tile));
  }

  displayFlaws(game) {
    const characterFlaws = [this.flaw1, this.flaw2];
    for (let flaw of characterFlaws) {
      if (flaw) {
        return flawsDict[flaw](this, game);
      }
    }
  }
}

export const generateCharacters = () => {
  const John = new Character("John", 3, 1, "cyan");
  const Kevin = new Character("Kevin", 4, 1, "cornflowerblue");
  const Marcus = new Character("Marcus", 4, 8, "red");
  const Nick = new Character("Nick", 3, 8, "maroon");
  Nick.direction = "up";
  Marcus.direction = "up";
  return [John, Kevin, Marcus, Nick];
};

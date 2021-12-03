import styled from "styled-components";
import { convertX, convertY, isCharacter } from "../scripts/utils";

const CharacterPanelWrapper = styled.div`
  border: 1px solid black;
  margin: 20px;
  padding-left: 20px;
`;

const Coordinates = styled.span`
  font-family: consolas;
`;

export const CharacterPanel = (props) => {
  const { game, updateKey } = props;
  const curChar = game.characters[game.selectedChar];

  if (curChar) {
    const mapNames = (char) => char.name;
    const charsAdjacent = curChar
      .getAdjacentTiles(game)
      .filter(isCharacter)
      .map(mapNames)
      .join(", ");
    const charsInControl = curChar
      .getControlZoneTiles(game)
      .filter(isCharacter)
      .map(mapNames)
      .join(", ");

    const charsInLOS = curChar.getLOS(game).map(mapNames).join(", ");

    return (
      <CharacterPanelWrapper key={updateKey}>
        <p>Currently selected character: {curChar.name}</p>
        <p>
          Character location:{" "}
          <Coordinates>
            {convertX(curChar.x)}
            {convertY(curChar.y)}
          </Coordinates>
        </p>
        <p>Characters adjacent: {charsAdjacent}</p>
        <p>Characters in control zone: {charsInControl}</p>
        <p>Characters in line of sight: {charsInLOS}</p>
      </CharacterPanelWrapper>
    );
  }
  return (
    <CharacterPanelWrapper key={updateKey}>
      <p>No currently selected character</p>
    </CharacterPanelWrapper>
  );
};

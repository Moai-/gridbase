import { Grid } from "./components/grid";
import { UpperControls } from "./components/upperControls";
import { LowerControls } from "./components/lowerControls";
import { CharacterPanel } from "./components/characterPanel";
import { Game } from "./scripts/game";
import { Character } from "./scripts/character";
import { useState } from "react";
import styled from "styled-components";

const GameAreaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 120px;
`;

const ControlWrapper = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const game = new Game();
game.setGrid(10, 10);

window.game = game;
window.Character = Character;

const App = () => {
  // Manual refresh for everything in the game. The Game class uses this to
  // signal to the UI that it needs to be updated.
  const [updateKey, setUpdateKey] = useState(1);
  game.setRefresh(() => {
    setUpdateKey(Math.random());
  });

  return (
    <GameAreaWrapper>
      <Grid game={game} updateKey={updateKey} />
      <ControlWrapper>
        <UpperControls game={game} updateKey={updateKey} />
        <CharacterPanel game={game} updateKey={updateKey} />
        {/*<LowerControls game={game} /> commenting them out for now as it's no longer necessary*/}
      </ControlWrapper>
    </GameAreaWrapper>
  );
};

export default App;

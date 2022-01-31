import { Grid } from './components/grid'
// import { UpperControls } from './components/upperControls'
// import { LowerControls } from './components/lowerControls'
// import { CharacterPanel } from './components/characterPanel'
import { Game } from './engine/game'
// import { Character } from './engine/character'
import { useState } from 'react'
import styled from 'styled-components'
import { adoptRules } from './rules/current'

const GameAreaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 120px;
`

const ControlWrapper = styled.div`
  flex: 1;
  margin-left: 20px;
`

// window.Character = Character

const App = () => {

  // Manual refresh for everything in the game. The Game class uses this to
  // signal to the UI that it needs to be updated.
  const [updateKey, setUpdateKey] = useState(`1`)
  const g = adoptRules()
  g.setRefresh(() => {
    setUpdateKey(`${Math.random() * Date.now()}`)
  })

  return (
    <GameAreaWrapper>
      <Grid game={g} updateKey={updateKey} />
      {/* <ControlWrapper>
        <UpperControls game={game} updateKey={updateKey} />
        <CharacterPanel game={game} updateKey={updateKey} />
        <LowerControls game={game} />
      </ControlWrapper> */}
    </GameAreaWrapper>
  );
}

export default App;

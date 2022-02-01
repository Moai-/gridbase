import React from 'react'
import { Grid } from './components/grid'
import { useState } from 'react'
import styled from 'styled-components'
import { adoptRules } from './rules/1.2.1'
import { GameContext } from './GameContext'

const GameAreaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 120px;
`

const ControlWrapper = styled.div`
  flex: 1;
  margin-left: 20px;
`


const game = adoptRules()

const App = () => {
  // Manual refresh for everything in the game. The Game class uses this to
  // signal to the UI that it needs to be updated.
  const [updateKey, setUpdateKey] = useState(`1`)
  game.setRefresh(() => {
    setUpdateKey(`${Math.random() * Date.now()}`)
  })
  
  return (
    <GameAreaWrapper>
      <GameContext.Provider value={game}>
        <Grid updateKey={updateKey} />
        <ControlWrapper id={updateKey}>
          {game.getUIRender()}
        </ControlWrapper>
      </GameContext.Provider>

      {/* <ControlWrapper>
        <UpperControls game={game} updateKey={updateKey} />
        <CharacterPanel game={game} updateKey={updateKey} />
        <LowerControls game={game} />
      </ControlWrapper> */}
    </GameAreaWrapper>
  );
}

export default App;

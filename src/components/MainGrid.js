import { Grid, Segment, Button } from 'semantic-ui-react';
import LetterChoice from './LetterChoice'
import Timer from './Timer'
import logo from '../logo.png';

function MainGrid({ gameState, startGame }) {
  return (
    <div>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <LetterChoice letterChoice={gameState.letterChoice}/>
          </Grid.Column>
          <Grid.Column>
            <img className="main-logo" src={logo} alt=""/>
            <Button
              color='yellow'
              size="massive"
              onClick={gameState.gameStarted ? null : startGame}
            >
              {gameState.gameStarted ? "In Progress" : "Start Game"}
            </Button>
          </Grid.Column>
          <Grid.Column>
          <Grid.Column>
            <Timer timer={gameState.timer}/>
          </Grid.Column>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="outline">
          <Grid.Column>
            <p>1. {gameState.itemArr[0]}</p>
            <p>2. {gameState.itemArr[1]}</p>
            <p>3. {gameState.itemArr[2]}</p>
            <p>4. {gameState.itemArr[3]}</p>
          </Grid.Column>
          <Grid.Column>
            <p>5. {gameState.itemArr[4]}</p>
            <p>6. {gameState.itemArr[5]}</p>
            <p>7. {gameState.itemArr[6]}</p>
            <p>8. {gameState.itemArr[7]}</p>
          </Grid.Column>
          <Grid.Column>
            <p>9. {gameState.itemArr[8]}</p>
            <p>10. {gameState.itemArr[9]}</p>
            <p>11. {gameState.itemArr[10]}</p>
            <p>12. {gameState.itemArr[11]}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default MainGrid;

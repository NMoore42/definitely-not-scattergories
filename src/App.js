
import { Component } from 'react';
import MainGrid from './components/MainGrid'
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { itemList } from './ItemList.js'
const alert = new Audio('/ship_bell.mp3')
let timer;


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      letterChoice: "-",
      timer: "2:30",
      itemArr: ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      gameStarted: false
    }
  }

  startGame = () => {
    timer = setInterval(this.startTimer, 1000)
    this.setState({
      letterChoice: this.getRandomLetter(),
      itemArr: this.getItemArr(),
      gameStarted: true,
      timer: "2:30",
    })
  }

  getRandomLetter = () => {
    const letterString = "ABCDEFGHIJKLMNOPRSTVWY"
    const index = Math.floor(Math.random() * letterString.length)
    return letterString[index]
  }

  getItemArr = () => {
    return this.shuffle().slice(0, 12)
  }

  shuffle = () => {
    let currentIndex = itemList.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = itemList[currentIndex];
      itemList[currentIndex] = itemList[randomIndex];
      itemList[randomIndex] = temporaryValue;
    }
    return itemList;
  }

  startTimer = () => {
    let mins = this.state.timer.slice(0, 1);
    let secs = this.state.timer.slice(2, 5);
    if (secs === "00"){
      secs = 59;
      mins -= 1;
    } else {
      secs -= 1;
      secs = secs < 10 ? "0" + secs : secs;
    }
    this.setState({
      timer: `${mins}:${secs}`
    })
    if (mins === "0" && secs === "00"){
      this.resetGame()
    }
  }



  resetGame = () => {
    clearInterval(timer)
    alert.play()
    this.setState({
      gameStarted: false
    })
  }



  render() {
    return (
      <div className="App">
        <MainGrid gameState={this.state} startGame={this.startGame}/>
      </div>
    );
  }
}

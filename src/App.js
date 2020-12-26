
import { Component } from 'react';
import MainGrid from './components/MainGrid'
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { itemList } from './ItemList.js'
import UIfx from 'uifx'
import tickAudio from './sounds/tick.mp3'
import endtickAudio from './sounds/endtick.mp3'
import buzzerAudio from './sounds/buzzer.mp3'
const tick = new UIfx(tickAudio,{volume: 0.4, throttleMs: 100})
const endtick = new UIfx(endtickAudio,{volume: 0.2, throttleMs: 100})
const buzzer = new UIfx(buzzerAudio,{volume: 0.075, throttleMs: 100})

let timer;


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      letterChoice: "-",
      timer: "0:15",
      itemArr: ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      gameStarted: false
    }
  }

  startGame = () => {
    this.cycleRandomLetters(150, "ABCDEFGHIJKLMNOPRSTVWY")
  }

  getRandomLetter = (letterString) => {
    const index = Math.floor(Math.random() * letterString.length)
    const chosenLetter = letterString[index]
    this.setState({
      letterChoice: chosenLetter
    })
    return letterString.replace(chosenLetter, "");
  }

  cycleRandomLetters = (i, letterString) => {
    const newString = this.getRandomLetter(letterString)
    tick.play()
    if (i < 1000) {
      setTimeout(() => this.cycleRandomLetters(i * 1.5, newString), i)
    } else {
      timer = setInterval(this.startTimer, 1000)
      this.setState({
        itemArr: this.getItemArr(),
        gameStarted: true,
        timer: "0:15",
      })
    }
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
    if (mins === "0" && secs === 10){
      endtick.play()
    }
    if (mins === "0" && secs === "00"){
      this.resetGame()
    }
  }



  resetGame = () => {
    clearInterval(timer)
    buzzer.play()
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

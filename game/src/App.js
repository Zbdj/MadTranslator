import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class App extends Component{
  state={
    word : "",
    traduction : "",
    difficult : 0,
    score: 10,
  }
  componentDidMount(){
    this.getWord();
  }

  getWord(){
    axios.get('http://localhost:4000/', {
    }).then(rep => {
      //console.log(rep.data)

      this.setState({
        word:rep.data.word,
        traduction: rep.data.result,
        difficult: rep.data.difficulty
      })
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p>Ton score : {this.state.score}</p>
          <p>Mot : {this.state.word}</p>
          <p>Trad : {this.state.traduction}</p>
          <p>Difficulté : {this.state.difficult} / 10</p>
        </header>
      </div>
    );
  }
}
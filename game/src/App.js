import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class App extends Component{
  state={
    word : "",
    traduction : "",
    difficult : 0,
    score: 10,
    placeholderHelp: "",
    textInput: "",
    good: false,
    err: false,
    winner:0,
    looser: 0,
    startGame:false,
  }

  componentDidMount(){
    this.getWord();
  }

  getWord(){
    var last = "";

    this.state.good === false && this.state.err === false?
    last = "startGame"
    :
    this.state.good === false?
    last = "loose"
    :
    last="win"

    axios.get('http://localhost:4000/'+ last, {
    }).then(rep => {
      //console.log(rep.data)
      var str = "";

      for (let i = 0; i < rep.data.result.length; i++) {
        str += "-"
      }

      this.setState({
        word:rep.data.word,
        traduction: rep.data.result,
        difficult: rep.data.difficulty,
        placeholderHelp: str,
        textInput: "",
      })
    })
  }

  handleChange(event) {
    this.setState({textInput: event.target.value});
    //console.log(this.state.textInput)
  }

  submit(){
    var reponse = this.state.textInput;
  
    if(this.state.traduction === reponse){
      this.state.score < 19 ?
      this.setState({
        score: this.state.score + 1,
        good: true,
        err:false,
      }, () => {
        this.getWord();
      })
      :
      this.setState({
        winner: 1
      })

    }else{
      this.state.score > 1 ?
      this.setState({
        score: this.state.score - 1,
        good: false,
        err:true,
      }, () => {
        this.getWord();
      })
      :
      this.setState({
        looser: 1
      })
    }
  }
  exit(){
    this.setState({
      word : "",
      traduction : "",
      difficult : 0,
      score: 10,
      placeholderHelp: "",
      textInput: "",
      good: false,
      err: false,
      winner:0,
      looser: 0,
      startGame:false,
    })
  }

  replay(){
    this.setState({
      word : "",
      traduction : "",
      difficult : 0,
      score: 10,
      placeholderHelp: "",
      textInput: "",
      good: false,
      err: false,
      winner:0,
      looser: 0,
    }, () => {
      this.getWord();
    })
  }

  startGame(){
    
    this.setState({
      startGame: true
    }, () =>{
      this.getWord();
    })
  }

  render(){
    return (
      this.state.startGame === false ?
      <div className="App-header">
      <div class="card text-white bg-primary mb-3" style={{maxWidth: "100rem"}}>
        <div class="card-header text-center"><h4>Bienvenue sur MadTranslator !</h4></div>
        <div class="card-body text-center">
          <h5 class="card-title mt-3">Des mots en francais te sont proposés arriveras-tu à tous les traduire ?</h5>
          <button type="button" class="btn btn-success mt-4 mb-2" style={{ fontSize:18 }} onClick={this.startGame.bind(this)}>C'est parti !</button>         
        </div>
      </div>
      </div>
      :
      this.state.winner === 1 ?
      <div className="App-header">
              <div className="App-header">
        <div class="card text-white bg-primary mb-3" style={{maxWidth: "100rem"}}>
          <div class="card-header text-center"><h4>Fin de la partie !</h4></div>
          <div class="card-body text-center">
            <h5 class="card-title mt-3">Tu as gagné, ton score a atteint 20, félicitations  !</h5>
            <div className="row mt-4 mb-2">
              <div className="col">
                <button type="button" class="btn btn-danger mt-3 mb-2" style={{ fontSize:18 }} onClick={this.exit.bind(this)}>Quitter</button>         
              </div>
              <div className="col">
                <button type="button" class="btn btn-success mt-3 mb-2" style={{ fontSize:18 }} onClick={this.replay.bind(this)}>Rejouer</button>         
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      :
      this.state.looser === 1 ?
      <div className="App-header">
        <div class="card text-white bg-primary mb-3" style={{maxWidth: "100rem"}}>
          <div class="card-header text-center"><h4>Fin de la partie !</h4></div>
          <div class="card-body text-center">
            <h5 class="card-title mt-3">Tu as perdu, ton score a atteint 0, bien essayé !</h5>
            <div className="row mt-4 mb-2">
              <div className="col">
                <button type="button" class="btn btn-danger mt-3 mb-2" style={{ fontSize:18 }} onClick={this.exit.bind(this)}>Quitter</button>         
              </div>
              <div className="col">
                <button type="button" class="btn btn-success mt-3 mb-2" style={{ fontSize:18 }} onClick={this.replay.bind(this)}>Rejouer</button>         
              </div>
            </div>
          </div>
        </div>
        </div>
      :
        <div className="App-header">
            <div class="alert alert-warning" style={{ position:"absolute", left:"70%", top:"5%" }}>
              <h5 class="alert-heading mt-1">Ton score : {this.state.score}</h5>
            </div>

          <div class="card text-white bg-primary mb-3 text-center" style={{maxWidth: "100rem"}}>
            <div class="card-header"><h4>Essaie de traduire !</h4></div>

            <div class="card-body">
              <h4 class="card-title">{this.state.word}</h4>
                <input type="text" placeholder={this.state.placeholderHelp} className="form-control text-center mt-4 mb-2" value={this.state.textInput} onChange={this.handleChange.bind(this)} style={{width:"100%", height:"100%", fontSize:24, color:"black"}}/>
                <p class="card-text mt-3">La traduction commence par la lettre  <strong style={{fontSize:22}}>{this.state.traduction.substring(0,1)}</strong> et comporte <strong style={{fontSize:19}}>{this.state.traduction.length}</strong> lettres</p>
                <p class="card-text">Difficulté : {this.state.difficult} / 10</p>
                <button type="button" class="btn btn-success mt-3 mb-2" onClick={this.submit.bind(this)} style={{ fontSize:18 }}>Confirmer !</button>         
            </div>
          </div>
          {
              this.state.err === true ?
              <div class="alert alert-danger mt-5" style={{ position:'absolute', top:"72%" }}>
              <strong>Mauvaise réponse 1 point en moins !</strong>
              </div>
              :
              this.state.good === true ?
              <div class="alert alert-success mt-5" style={{ position:'absolute', top:"72%" }}>
              <strong>Bonne réponse 1 point en plus ! </strong>
              </div>
              :
              <div></div>
            }
          </div>
    );
  }
}
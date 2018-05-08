import React, { Component } from "react";
import "./App.css";
import Audiostream from "./components/Audiostream";
import Recordings from "./components/Recordings";
import { audios } from "./store";

class App extends Component {
  state = {
    audios
  };

  handleAudioCreate = audio => {
    this.setState({ audios: [...this.state.audios, audio] });
  };

  handleAudioDelete = i =>
    this.setState(({ audios }) => ({
      audios: audios.splice(i, 1)
    }));

  render() {
    return (
      <div className="Recorder">
        <header className="App-header">
          <h1 className="App-title">Audio Recorder</h1>
        </header>
        <p className="App-intro">
          This Web Application will record audio files which can be saved and
          sent off from device.
        </p>
        {console.log("audios: ", this.state)}
        <div className="Main">
          <Audiostream onAudioCreate={this.handleAudioCreate} />
          <Recordings audios={audios} onAudioDelete={this.handleAudioDelete} />
        </div>
      </div>
    );
  }
}

export default App;

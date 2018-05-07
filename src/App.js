import React, { Component } from "react";
import "./App.css";
import Audiostream from "./components/Audiostream";

class App extends Component {
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
        <div className="Main">
          <Audiostream />
        </div>
      </div>
    );
  }
}

export default App;

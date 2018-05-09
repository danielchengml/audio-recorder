import React, { Component } from "react";
import "./App.css";
import Audiostream from "./components/Audiostream";
import Recordings from "./components/Recordings";
import { audios } from "./store";
import { withStyles } from "material-ui/styles";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

const THEME = createMuiTheme({
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});

class App extends Component {
  state = {
    audios
  };

  handleAudioCreate = audio => {
    this.setState({ audios: [...this.state.audios, audio] });
  };

  handleAudioDelete = i => {
    this.setState({
      audios: this.state.audios.filter((_, index) => index !== i)
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={THEME}>
        <div className="Recorder">
          {console.log("Global State: ", this.state)}
          <header className="App-header">
            <h1 className="App-title">Audio Recorder</h1>
          </header>
          <p className="App-intro">
            This Web Application will record audio files which can be saved and
            sent off from device.
          </p>
          <div className="Main">
            <Audiostream onAudioCreate={this.handleAudioCreate} />
            <Recordings
              audios={this.state.audios}
              onAudioDelete={this.handleAudioDelete}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

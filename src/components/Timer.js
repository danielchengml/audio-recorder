import React, { Component } from "react";

class Timer extends Component {
  state = {
    elapsed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    let timer = this.state.elapsed;
    this.setState({ elapsed: timer + 1 });
  };

  render() {
    const seconds = Math.round(this.state.elapsed);
    return (
      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
          fontSize: 30,
          color: "#f22424",
          alignItem: "center"
        }}
      >
        RECORDING: {seconds}s
      </div>
    );
  }
}

export default Timer;

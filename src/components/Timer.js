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
    return <div>{seconds}s</div>;
  }
}

export default Timer;

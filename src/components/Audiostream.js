import React, { Component } from "react";

const audioType = "audio/webm";

class Audiostream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recoding: false,
      audios: []
    };
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });
    this.audio.src = window.URL.createObjectURL(stream);
    this.audio.play();
    // initialize recording
    this.mediaRecording = new MediaRecorder(stream, {
      mimetype: audioType
    });
    // Init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
  }

  render() {
    const { recording, videos } = this.state;

    return (
      <div className="microphone">
        <audio
          ref={a => {
            this.audio = a;
          }}
          autoplay
          controls
        />
      </div>
    );
  }
}

export default Audiostream;

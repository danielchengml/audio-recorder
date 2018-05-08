import React, { Component, Fragment } from "react";
import Audiocanvas from "./Audiocanvas";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import Stop from "@material-ui/icons/Stop";
import KeyboardVoice from "@material-ui/icons/KeyboardVoice";
import KeyHandler, { KEYPRESS } from "react-key-handler";
import Timer from "./Timer";

const audioType = "audio/mp3";

class Audiostream extends Component {
  state = {
    recording: false
  };

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });
    this.audio.srcObject = stream;
    this.audio.play();
    // initialize recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimetype: audioType
    });
    // Init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  handleKey = e => {
    console.log("Hello");
  };

  startRecording = e => {
    e.preventDefault();
    // wipe old datas
    this.chunks = [];
    // start recording with 10ms buffer
    this.mediaRecorder.start(10);
    // set state to "recording: true"
    this.setState({ recording: true });
  };

  stopRecording = e => {
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // change recording to "recording: false"
    this.setState({ recording: false });
    // save audio to memory
    this.saveAudio();
  };

  saveAudio = () => {
    // convert saved chunks to blob
    const audioBlob = new Blob(this.chunks, {
      type: audioType
    });
    const date = Date.now();
    const size = audioBlob.size;
    // Create an Audio File Object
    const audioFile = {
      key: date + "-audio-file-" + size + "Kb.mp3",
      body: audioBlob,
      contentType: `{audioBlob.type}`,
      url: ""
    };
    // append audioURL to list of saved audo for rendering
    this.props.onAudioCreate(audioFile);
  };

  render() {
    const { recording } = this.state;

    return (
      <div className="microphone">
        <Typography style={{ marginTop: 20 }} variant="display1">
          Recorder:
        </Typography>
        <KeyHandler
          keyEventName={KEYPRESS}
          keyCode={32}
          onKeyHandle={e =>
            this.state.recording
              ? this.stopRecording(e)
              : this.startRecording(e)
          }
        />
        <Paper style={{ marginTop: 10, textAlign: "center", padding: 20 }}>
          {!recording && (
            <Fragment>
              <Typography variant="display1" color="secondary">
                Press "Record" to Start
              </Typography>
              <Typography variant="title" color="secondary">
                [Or use "Spacebar"]
              </Typography>
            </Fragment>
          )}
          {recording && (
            <Fragment>
              <Typography variant="display1" color="secondary">
                Recording...
              </Typography>
              <Typography variant="title" color="default">
                <Timer />
              </Typography>
              <Typography variant="caption" color="secondary">
                [Use "Spacebar" to Stop]
              </Typography>
            </Fragment>
          )}

          <audio
            ref={a => {
              this.audio = a;
            }}
          />
          <br />
          {!recording && (
            <Button
              variant="raised"
              color="primary"
              onClick={e => this.startRecording(e)}
            >
              <KeyboardVoice style={{ marginRight: 5, marginLeft: -5 }} />
              Record
            </Button>
          )}
          {recording && (
            <Button
              variant="raised"
              color="secondary"
              onClick={e => this.stopRecording(e)}
            >
              <Stop style={{ marginRight: 5, marginLeft: -5 }} />
              Stop
            </Button>
          )}
        </Paper>
      </div>
    );
  }
}

export default Audiostream;

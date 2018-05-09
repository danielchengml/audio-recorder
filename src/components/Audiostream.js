import React, { Component, Fragment } from "react";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import Stop from "@material-ui/icons/Stop";
import KeyboardVoice from "@material-ui/icons/KeyboardVoice";
import KeyHandler, { KEYDOWN, KEYUP } from "react-key-handler";
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
      contentType: audioBlob.type,
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
          keyEventName={KEYDOWN}
          keyCode={32}
          onKeyHandle={e => {
            if (!this.state.recording) {
              this.startRecording(e);
            }
          }}
        />
        <KeyHandler
          keyEventName={KEYUP}
          keyCode={32}
          onKeyHandle={e => {
            if (this.state.recording) {
              this.stopRecording(e);
            }
          }}
        />
        <Paper
          style={{
            marginTop: 10,
            textAlign: "center",
            padding: 20,
            backgroundColor: "#efefef"
          }}
        >
          {!recording && (
            <Fragment>
              {!recording && (
                <Button
                  variant="raised"
                  color="default"
                  size="large"
                  style={{
                    marginTop: 25,
                    marginBottom: 10,
                    minWidth: 380,
                    color: "#056dbc"
                  }}
                  onClick={e => this.startRecording(e)}
                >
                  <KeyboardVoice
                    style={{
                      marginRight: 5,
                      marginLeft: -5,
                      color: "#056dbc"
                    }}
                  />
                  Start Recording
                </Button>
              )}
              <Typography
                variant="caption"
                style={{
                  marginBottom: 20,
                  fontSize: 18,
                  color: "rgba(0, 62, 109. 0.8)"
                }}
              >
                Or Press & Hold the <strong>"SPACEBAR"</strong> Key to Start
              </Typography>
            </Fragment>
          )}
          {recording && (
            <Fragment>
              <Button
                variant="raised"
                color="default"
                size="large"
                style={{
                  marginTop: 25,
                  marginBottom: 10,
                  minWidth: 380,
                  color: "#f22424"
                }}
                onClick={e => this.stopRecording(e)}
              >
                <Stop
                  style={{ color: "#f22424", marginRight: 5, marginLeft: -5 }}
                />
                Stop Recording
              </Button>
              <Typography
                variant="caption"
                style={{ color: "rgba(0, 62, 109. 0.8)", fontSize: 18 }}
              >
                Or Release the <strong>"SPACEBAR"</strong> Key to Stop
              </Typography>
              <Timer />
            </Fragment>
          )}

          <audio
            ref={a => {
              this.audio = a;
            }}
          />
        </Paper>
      </div>
    );
  }
}

export default Audiostream;

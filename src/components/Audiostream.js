import React, { Component } from "react";
import Audiocanvas from "./Audiocanvas";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Icon from "material-ui/Icon";
import Delete from "@material-ui/icons/Delete";
import Stop from "@material-ui/icons/Stop";
import KeyboardVoice from "@material-ui/icons/KeyboardVoice";

const audioType = "audio/mp3";

class Audiostream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      stream: this.stream,
      audios: []
    };
  }

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

  startRecording(e) {
    e.preventDefault();
    // wipe old datas
    this.chunks = [];
    // start recording with 10ms buffer
    this.mediaRecorder.start(10);
    // set state to "recording: true"
    this.setState({ recording: true });
  }

  stopRecording(e) {
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // change recording to "recording: false"
    this.setState({ recording: false });
    // save audio to memory
    this.saveAudio();
  }

  saveAudio() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, {
      type: audioType
    });
    // generate audio url from blob
    const audioURL = window.URL.createObjectURL(blob);
    console.log(blob);
    // append audioURL to list of saved audo for rendering
    const audios = this.state.audios.concat([blob]);
    this.setState({ audios });
    console.log(this.state);
  }

  render() {
    const { recording, audios } = this.state;

    return (
      <div className="microphone">
        <Typography style={{ marginTop: 20 }} variant="display1">
          Recorder:
        </Typography>
        <Paper style={{ marginTop: 10, textAlign: "center", padding: 20 }}>
          <Audiocanvas />
          <audio
            ref={a => {
              this.audio = a;
            }}
          />
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
        <Typography style={{ marginTop: 20 }} variant="display1">
          Recorded Audio Files:
        </Typography>
        <Paper style={{ marginTop: 10, minHeight: 250, padding: 15 }}>
          <Grid container style={{ direction: "row" }}>
            {audios.map((blob, i) => (
              <Card
                key={`audio_${i}`}
                style={{ textAlign: "center", margin: 10 }}
              >
                <CardContent>
                  <Typography variant="title">Audio-file-{i + 1}</Typography>
                  <audio
                    style={{ marginTop: 15 }}
                    src={window.URL.createObjectURL(blob)}
                    controls
                  />
                  <Typography>{blob.size / 1000} Kb</Typography>
                </CardContent>
                <CardActions style={{ textAlign: "center" }}>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="secondary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default Audiostream;

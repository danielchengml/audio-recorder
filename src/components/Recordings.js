import React, { Component, Fragment } from "react";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Sharelink from "./Sharelink";

class Recordings extends Component {
  deleteAudio = i => {
    this.props.onAudioDelete(i);
  };
  render() {
    const { audios } = this.props;
    return (
      <Fragment>
        <Typography style={{ marginTop: 20 }} variant="display1">
          Recorded Audio Files:
        </Typography>
        <Paper style={{ marginTop: 10, minHeight: 250, padding: 15 }}>
          <Grid container style={{ direction: "row" }}>
            {audios.map((audio, i) => (
              <Card
                key={`audio_${i}`}
                style={{ textAlign: "center", width: 400, margin: 10 }}
              >
                <CardContent>
                  <Typography variant="subheading">{audio.key}</Typography>
                  <audio
                    style={{ marginTop: 15, width: 360 }}
                    src={window.URL.createObjectURL(audio.body)}
                    controls
                  />
                  <Typography style={{ textAlign: "right" }} variant="caption">
                    {audio.body.size / 1000} Kb
                  </Typography>
                </CardContent>
                <CardActions style={{ backgroundColor: "#f2fcff" }}>
                  <Sharelink />
                  <Button
                    onClick={() => this.deleteAudio(i)}
                    size="small"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Paper>
      </Fragment>
    );
  }
}

export default Recordings;

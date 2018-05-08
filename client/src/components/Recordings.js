import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";

class Recordings extends Component {
  state = {
    audios: this.props.audios
  };

  deleteAudio = i => {
    // this.props.onAudioDelete(i);
  };
  render() {
    const { audios } = this.state;
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
                {console.log(i)}
                <CardContent>
                  <Typography variant="title">{audio.key}</Typography>
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
                  <Button size="small" color="primary">
                    Share
                  </Button>
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

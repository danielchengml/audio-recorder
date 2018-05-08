import React, { Component, Fragment } from "react";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

class Sharelink extends Component {
  state = {
    open: false,
    audio: this.props.audio
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getAudioLink = () => {

  }

  render() {
    console.log("state: ", this.state);
    return (
      <Fragment>
        <Button onClick={this.handleClickOpen} size="small" color="primary">
          Share
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Share Audio Link</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.audio.key}</DialogContentText>
            <br />
            <code>
              Link:{" "}
              {this.state.audio.url === "" ? (
                <Button onClick={this.getAudioLink}>Get Link</Button>
              ) : (
                <a href={this.state.audio.url} target="_blank">
                  {this.state.audio.url}
                </a>
              )}
            </code>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default Sharelink;

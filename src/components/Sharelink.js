import React, { Component, Fragment } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "material-ui/Button";
import Input from "material-ui/Input";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Typography from "material-ui/Typography";

import AWS from "aws-sdk";
import Credentials from "../config/keys";

AWS.config.update({
  accessKeyId: Credentials.accessKeyId,
  secretAccessKey: Credentials.secretAccessKey
});

const S3_BUCKET = "upload-audio-recording";

class Sharelink extends Component {
  state = {
    open: false,
    audio: this.props.audio,
    copied: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getAudioLink = () => {
    const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

    const type = this.state.audio.body.type;
    // Define Object
    const params = {
      Bucket: S3_BUCKET + "/audio",
      Key: this.state.audio.key,
      Body: this.state.audio.body,
      ACL: "public-read",
      ContentType: type
    };
    // Upload the file to S3 Bucket
    s3.upload(params, (err, data) => {
      if (err) console.log("putObjectError: ", err, err.stack);
      else
        this.setState(prevState => ({
          audio: {
            ...prevState.audio,
            url: data.Location
          }
        }));
    });
  };

  selectText = e => {
    e.target.select();
  };

  onCopy = () => {
    this.setState({ copied: true });
    this.setState({ snackbarOpen: true });
  };

  onChange = () => {
    this.setState({ copied: false });
  };

  render() {
    return (
      <Fragment>
        {console.log("Recording: ", this.state)}
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
            <div>
              Link:{" "}
              {this.state.audio.url === "" ? (
                <Button
                  style={{ marginLeft: 10 }}
                  variant="raised"
                  size="small"
                  onClick={this.getAudioLink}
                >
                  Get Link
                </Button>
              ) : (
                <Fragment>
                  <Input
                    style={{ fontSize: 15 }}
                    type="text"
                    multiline
                    fullWidth
                    onFocus={e => this.selectText(e)}
                    value={this.state.audio.url}
                    onChange={this.onChange}
                  />
                  <CopyToClipboard
                    text={this.state.audio.url}
                    onCopy={this.onCopy}
                  >
                    <Button
                      style={{
                        marginTop: 10,
                        fontSize: 13,
                        backgroundColor: "#e8e8e8"
                      }}
                      size="small"
                    >
                      Copy Link
                    </Button>
                  </CopyToClipboard>
                  <br />
                </Fragment>
              )}
            </div>
            {this.state.copied ? (
              <span>
                <Typography
                  style={{ marginTop: 10 }}
                  variant="caption"
                  color="primary"
                >
                  Link Copied!
                </Typography>
              </span>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button
              variant="raised"
              size="small"
              onClick={this.handleClose}
              style={{
                margin: 10,
                color: "#f22424"
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default Sharelink;

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
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
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
            <DialogContentText>
              Audio URL: http://s3.Amazon-audio...
            </DialogContentText>
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

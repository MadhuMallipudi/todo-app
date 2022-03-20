import * as React from 'react';
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import Add from "../components/add";
export default function AlertDialog(props) {
  console.log("props",props.open)
  const [open, setOpen] = React.useState(props.open);
  const handleClose = () => {
    setOpen(false);
    props.openDialog(false)
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <Add/>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

import  React,{useEffect,useState} from 'react';
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import PostComponent from "../components/postComponent";
export default function AlertDialog(props) {
  const [open, setOpen] = useState(props.open);
  const [edit,setEdit] = useState(false)
  useEffect(()=>{
      if(props?.postData){
        setEdit(true);
      }
  })  
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
          {edit ? "Edit Post" : "Add Post" }
        </DialogTitle>
        <DialogContent>
          <PostComponent type={edit ?  "edit" : "add"} postData={ props?.postData}/>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

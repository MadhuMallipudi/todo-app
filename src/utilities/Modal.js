import  React,{useEffect,useState} from 'react';
import {Button,Dialog,DialogActions,DialogContent,DialogTitle} from '@mui/material';
import PostComponent from "../components/posts/postComponent";
import ViewComponent from '../components/posts/viewComponent';
import DeleteComponent from '../components/posts/deleteComponent';
import TodoComponent from "../components/todos/TodoComponent";
import DeleteTodoComponent from "../components/todos/deleteComponent";
export default function AlertDialog(props) {
  const [open, setOpen] = useState(props.open);
  const [edit,setEdit] = useState(false)
  const type = props.type; 
  useEffect(()=>{
      if(props?.postData){
        setEdit(true);
      }
  },[edit,props.postData])  
  const handleClose = () => {
    setOpen(false);
    props.openDialog(false)
  };
  const getComponent = (type) => {
    switch (type) {
        case "add":
          return <PostComponent handleClose={handleClose} type={type} postData={ props?.postData}/>
        case "edit":   
          return <PostComponent handleClose={handleClose} type={type} postData={ props?.postData}/>
        case "view":
            return <ViewComponent postData={ props?.postData}/>
        case "delete": 
            return  <DeleteComponent refresh={props.refresh} handleClose={handleClose} postData={ props?.postData}/>   
       
        case "add todo":
            return <TodoComponent handleClose={handleClose} type={type} postData={ props?.postData}/>
        case "delete todo": 
            return  <DeleteTodoComponent refresh={props.refresh} handleClose={handleClose} postData={ props?.postData}/>   
                 
        default:
            break;
    }
  }

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
         <span className='captilizeText'>{type}</span>
        </DialogTitle>
        <DialogContent>
            {getComponent(type)}
        </DialogContent>
        <DialogActions>
           <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

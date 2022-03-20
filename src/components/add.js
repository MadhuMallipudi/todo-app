import React, { useState } from "react";
import {TextField,Box,Button} from '@mui/material';
import {createPost} from "../redux/actions/postActions"; 
import { useDispatch,useSelector } from 'react-redux';
import configuVariables from "../config";
 
export default function Add() {
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [titleerror,setTitleError] = useState(false);
  const [descerror,setBodyError] = useState(false);
  const dispatch = useDispatch();
  const addPost = async () => {
    if(title === ""){
        setTitleError(true)
    } 
    if(body === ""){
        setBodyError(true)
    }
    let data = {user_id:configuVariables.user_id,title,body}
    await dispatch(createPost(data))
    console.log("rrrr",title,body)
  } 
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
          error={titleerror}
          id="outlined-error-helper-text"
          label="Title"
          onChange={(e)=> {setTitle(e.target.value)}}
          fullWidth
      />
        <TextField
          error={descerror}  
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}
          fullWidth
        //   value={"value"}
          onChange={(e)=> {setBody(e.target.value)}}
        />
         <Button onClick={()=>{addPost()}} sx={{ml:2}} variant="outlined">Add Post</Button>
    </Box>
  );
}

import React, { useState,useEffect } from "react";
import {TextField,Box,Button} from '@mui/material';
import {savePost} from "../redux/actions/postActions"; 
import { useDispatch,useSelector } from 'react-redux';
import configuVariables from "../config";
 
export default function PostComponent(props) {
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [titleerror,setTitleError] = useState(false);
  const [descerror,setBodyError] = useState(false);
  const dispatch = useDispatch();
  const type = props?.type === "edit" ? "Edit" : "Add"  

  useEffect(()=>{
    console.log("props?.type",props)
     if(props?.type === "edit"){
        console.log("props?.type---in",props.postData.title)
        
        setTitle(props.postData.title)
        setBody(props.postData.body)
     }
  },[])


  const handleSubmit = async () => {
    if(title === ""){
        setTitleError(true)
    } 
    if(body === ""){
        setBodyError(true)
    }
    let data = {user_id:configuVariables.user_id,title,body}
    // await dispatch(createPost(data))
    await dispatch(savePost(data,props?.type))
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
          value={title}
          onChange={(e)=> {setTitle(e.target.value)}}
          fullWidth
      />
        <TextField
          error={descerror}  
          id="outlined-multiline-flexible"
          label="Description"
          value={body}
          multiline
          maxRows={4}
          fullWidth
        //   value={"value"}
          onChange={(e)=> {setBody(e.target.value)}}
        />
         <Button onClick={()=>{handleSubmit()}} sx={{ml:2}} variant="outlined">{type} Post</Button>
    </Box>
  );
}

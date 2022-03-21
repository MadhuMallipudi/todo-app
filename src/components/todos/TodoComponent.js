import React, { useState } from "react";
import { TextField, Box, Button ,MenuItem} from '@mui/material';
import { fetchPosts,saveTodo } from "../../redux/actions/commonAction";
import { useDispatch, useSelector } from 'react-redux';

export default function TodoComponent(props) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [date,setDate] = useState(null);
  
  const [titleerror, setTitleError] = useState(false);
  const [statuserror, setStatusError] = useState(false);
  const [dateerror, setDateError] = useState(false);
 
  let userInfo = useSelector((state)=>state.commonReducer.userInfo)
  const dispatch = useDispatch();
  const type = props?.type === "edit" ? "Edit" : "Add"

//   useEffect(() => {
//     if (props?.type === "edit") {
//       setTitle(props?.postData?.title)
//       setBody(props?.postData?.body)
//     }
//   }, [])

  const statusTypes = [
    {
      value: 'completed',
      label: 'Completed',
    },
    {
      value: 'pending',
      label: 'Pending',
    }
  ];
  const handleSubmit = async () => {
    if (title === "") {
      setTitleError(true)
    }
    if (status === "") {
      setStatusError(true)
    }
    if (date === "") {
        setDateError(true)
      }
    let data = { user_id: userInfo.userInfo.id, title, date:new Date(date),status }
    // if(props?.postData?.id){
    //   data["post_id"] = props?.postData?.id;
    // }
    await dispatch(saveTodo(data, props?.type))
    await dispatch(fetchPosts());
    props.handleClose();
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
        onChange={(e) => { setTitle(e.target.value) }}
        fullWidth
      />
       <TextField
        error={dateerror}
        type="date"
        id="date"
        onChange={(e) => { setDate(e.target.value) }}
        fullWidth
      />
      <TextField
          id="outlined-select-currency"
          select
          error = {statuserror}
          label="Select"
          value={status}
          onChange={(e) => {setStatus(e.target.value)}}
        >
          {statusTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div>
            <Button onClick={() => { handleSubmit() }} sx={{ ml: 2 }} variant="outlined">{type}</Button>
        </div>
    </Box>
  );
}

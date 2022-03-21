import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import {deleteTodo,getTodos} from "../../redux/actions/commonAction";
const DeleteComponent = (props) => {
    const post_id = props?.postData?.id
    const dispatchAction = useDispatch();
    const removeTodo = async () => {
        console.log("removePost")
        await dispatchAction(deleteTodo(post_id));
        await props.handleClose();
        await dispatchAction(getTodos());
        await props.refresh()
    }
    return (
       <div className="text-center">
            <h6>Are you sure,do you want to delete?</h6>
            <Button variant="outlined" onClick={()=>{removeTodo()}}>Delete</Button>
       </div>
    )
}

export default DeleteComponent;
import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import {deletePost,getPosts} from "../../redux/actions/commonAction";
const DeleteComponent = (props) => {
    const post_id = props?.postData?.id
    const dispatchAction = useDispatch();
    const removePost = async () => {
        console.log("removePost")
        await dispatchAction(deletePost(post_id));
        await props.handleClose();
        await dispatchAction(getPosts());
        await props.refresh()
    }
    return (
       <div className="text-center">
            <h6>Are you sure,do you want to delete?</h6>
            <Button variant="outlined" onClick={()=>{removePost()}}>Delete</Button>
       </div>
    )
}

export default DeleteComponent;
import React from 'react';
import {  Box,Grid } from '@mui/material';
import { useSelector } from 'react-redux'
const ViewComponent = (props) => {
    const data = props?.postData
    const all_comments = useSelector((state)=> state.commonReducer.comments);
    const postComments = (all_comments || []).filter((item)=> item.post_id === props.postData.id)
    const comments = postComments.map((item)=>{
        return(
            <div className='cmnt-show-blk'>
                 <p>{item.body}</p>   
                 <i>{item.name}</i>
            </div>
                
        )
    })
    return (
        <Grid mt={2} item xs={12} sm={12} md={6} lg={6}>
            <Box component={'div'}>
                <div className='main-blk'>
                    <div className="content-blk">
                        <p className="titl"><b>{data.title}</b></p>
                        <p className="">{data.body}</p>
                    </div>
                </div>
            </Box>
            <strong className='cmn-sec'>Comments</strong>
                { comments.length ?  
                    comments
                    :
                    <h6 className="text-center">No comments for this post</h6>
                }
        </Grid>
    )
}

export default ViewComponent;
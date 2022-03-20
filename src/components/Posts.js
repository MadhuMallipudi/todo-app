import React,{useEffect, useRef, useState} from 'react';
import Header from "./common/Header";
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import image from "../assets/images/logo512.png";
import { Container,Box,Paper, Button,Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import Select from 'react-select'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AlertDialog from "../utilities/Modal";
const Posts = () => {
    let mainPosts = useSelector((state) => state.commonReducer.posts);
    let posts = useSelector((state) => state.commonReducer.posts);
    const [listPosts,setListPosts] = useState(posts);
    const [selectedPost ,setSelectedPost] = useState("");    
    const [OpenModel,setOpenModel] = useState(false);
    useEffect(()=>{
        if(selectedPost){
            mainPosts = mainPosts.filter((item,index)=> item.id === selectedPost)
        } else {
            mainPosts = posts; 
        }
        setListPosts(mainPosts)
    },[selectedPost,OpenModel])

    // /public/v2/users/100/posts
    const postData = () => {
        return (listPosts || []).map((item,index)=>{
            return(
                <Grid mt={2} key={index} item xs={12} sm={12} md={6} lg={6}>
                    <Box component={'div'}>
                      <div className='main-blk'>
                           {/* <div className="img-blk">
                               <img src={image} width="50px" height="50px" />   
                           </div> */}
                           {/* <i>{MoreHorizIcon}</i> */}
                           <p className="edit-icon"><MoreHorizIcon/></p>
                           <div className="content-blk">
                                <p className="title"><b>{item.title}</b></p>
                                <p className="desc">{item.body}</p> 
                           </div>
                       </div>
                    </Box>
                </Grid>
            )   
        })
    }
    const options = () => {
        return (posts||[]).map((ele,index)=>{
              return {
                  "value":ele.id,
                  "label":ele.title
              }  
        })
    }
    const handleChange = (e) => {
        if(e && e?.value)
        setSelectedPost(e.value);
    }
    const openDialog = (OpenModel) => {
        setOpenModel(OpenModel);
    }
    console.log("OpenModel",OpenModel)
    return(
        <>
            <Header/>
            <Container>
            {OpenModel && <AlertDialog openDialog={openDialog} open={OpenModel}/>}
            {  posts ? 
                <>
                    <div className='blk'>
                        <div className='select-blk'>
                            <Select 
                                options={options()} 
                                isClearable={true}
                                onChange={(e)=> {handleChange(e)}}
                            />
                        </div>
                        <div className='btn-blk'>    
                            <Button variant="outlined" onClick={()=> setSelectedPost("")}>Show All</Button>
                            <Button sx={{ml:2}} variant="outlined" onClick={()=> {setOpenModel(true)} }>Add Post</Button>
                        </div>    
                    </div>
                    <Grid container sx={{ flexGrow: 1 }}>
                        {postData()}
                    </Grid>
                </>
                :
                <div>
                    <h3>No Posts Fond</h3>
                </div>
            }
            </Container>
        </>
    )
}
export default Posts;
import React, { useEffect, useRef, useState } from 'react';
import Header from "./common/Header";
import {useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Container, Box, Paper, Button, Typography, Popover } from '@mui/material';
import { styled } from "@mui/material/styles";
import Select from 'react-select'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AlertDialog from "../utilities/Modal";
import {fetchPosts} from "../redux/actions/postActions";
const Posts = () => {
    let mainPosts = useSelector((state) => state.commonReducer.posts);
    let posts = useSelector((state) => state.commonReducer.posts);
    // const [listPosts, setListPosts] = useState(posts);
    const [listPosts, setListPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState("");
    const [OpenModel, setOpenModel] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [post,setPost] = useState(null);
    const dispatchAction = useDispatch();
    useEffect(async () => {
        if (selectedPost) {
            mainPosts = mainPosts.filter((item) => item.id === selectedPost)
        } else {
            mainPosts = posts;
        }
        if(posts && posts.length){
            await dispatchAction(fetchPosts())
        }
        setListPosts(mainPosts)
    }, [selectedPost, OpenModel])

    const handleClick = (event,item) => {
        setAnchorEl(event.currentTarget)
        setPost(item)
    }

   
    const postData = () => {
        return (listPosts || []).map((item, index) => {
            return (
                <Grid mt={2} key={index} item xs={12} sm={12} md={6} lg={6}>
                    <Box component={'div'}>
                        <div className='main-blk'>
                            <div className="content-blk">
                                <p className="edit-icon">
                                    <MoreVertIcon
                                        aria-describedby={id}
                                        onClick={(event) => { handleClick(event,item) }}
                                    />
                                </p>
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
        return (posts || []).map((ele, index) => {
            return {
                "value": ele.id,
                "label": ele.title
            }
        })
    }
    const handleChange = (e) => {
        if (e && e?.value)
            setSelectedPost(e.value);
    }
    const openDialog = (OpenModel) => {
        setOpenModel(OpenModel);
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    console.log("OpenModel", OpenModel)
    return (
        <>
            <Header />
            <Container>
                {OpenModel && <AlertDialog postData={post} openDialog={openDialog} open={OpenModel} />}
                {(posts && posts.length) ?
                    <>
                        <div className='blk'>
                            <div className='select-blk'>
                                <Select
                                    options={options()}
                                    isClearable={true}
                                    onChange={(e) => { handleChange(e) }}
                                />
                            </div>
                            <div className='btn-blk'>
                                <Button variant="outlined" onClick={() => setSelectedPost("")}>Show All</Button>
                                <Button sx={{ ml: 2 }} variant="outlined" onClick={() => { setOpenModel(true) }}>Add Post</Button>
                            </div>
                        </div>
                        <Grid container sx={{ flexGrow: 1 }}>
                            {postData()}
                        </Grid>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={()=>{setAnchorEl(null)}}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{ p: 2,cursor:"pointer" }}><ModeEditIcon onClick={()=>{setOpenModel(true)}}/> </Typography>
                            <Typography sx={{ p: 2,cursor:"pointer" }}><VisibilityIcon/></Typography>
                            <Typography sx={{ p: 2,cursor:"pointer" }}><DeleteIcon/></Typography>
                        </Popover>
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
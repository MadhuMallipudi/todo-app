import React, { useEffect,useState } from 'react';
import Header from "../common/Header";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Container, Box, Button, Typography, Popover, TextField } from '@mui/material';
import Select from 'react-select'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AlertDialog from "../../utilities/Modal";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { fetchPosts, postComment ,fetchUser} from "../../redux/actions/commonAction";
const Posts = () => {
    let mainPosts = useSelector((state) => state.commonReducer.posts);
    let posts = useSelector((state) => state.commonReducer.posts);
    let userInfo = useSelector((state)=>state.commonReducer.userInfo)
    const [listPosts, setListPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState("");
    const [OpenModel, setOpenModel] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [post, setPost] = useState(null);
    const [type, setType] = useState("");
    const [openComment, setOpenComment] = useState(false);
    const [CommentPost, setCommentPost] = useState(null);
    const [comment, setComment] = useState("");
    const [refreshComp,setRefreshComp] = useState(false);
    const dispatchAction = useDispatch();
    useEffect(async () => {
        if (selectedPost) {
            mainPosts = mainPosts.filter((item) => item.id === selectedPost)
        } else {
            mainPosts = posts;
        }
        await dispatchAction(fetchUser());
        await dispatchAction(fetchPosts())
        setListPosts(mainPosts)
    }, [selectedPost, OpenModel,refreshComp])

    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget)
        setPost(item)
    }
    const enableComment = (item) => {
        setOpenComment(true);
        setCommentPost(item)
    }
    const handleChangeComment = (e, item) => {
        console.log("item",item)
        let commentPayload = { post_id: item.id, body: e.target.value,email:userInfo?.userInfo?.email,name:userInfo?.userInfo?.name }
        setComment(commentPayload);
    }
    const saveComment = () => {
        dispatchAction(postComment(comment))
        setOpenComment(false);
        setCommentPost(null)
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
                                        onClick={(event) => { handleClick(event, item) }}
                                    />
                                </p>
                                <p className="title"><b>{item.title}</b></p>
                                <p className="desc">{item.body}</p>
                            </div>
                        </div>
                    </Box>
                    <span className='cmnt' onClick={() => { enableComment(item) }}>Comment here</span>
                    {openComment && CommentPost.id === item.id ?
                        <div className='cmnt-blk'>
                            <TextField id="standard-basic" label="comment" variant="standard" onChange={(e) => { handleChangeComment(e, item) }} />
                            <span onClick={() => { saveComment() }}><AddCircleIcon /></span>
                        </div>
                        : null}
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

    const openComponent = (type) => {
        setType(type);
        setOpenModel(true);
    }
    const openDialog = (OpenModel) => {
        if (type === "add") {
            setPost(null)
        }
        setOpenModel(OpenModel);
    }
    const refresh = () => {
        setRefreshComp(true)
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            <Header />
            <Container>
                {OpenModel && <AlertDialog type={type} postData={post} refresh={refresh} openDialog={openDialog} open={OpenModel} />}
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
                                <Button sx={{ ml: 2 }} variant="outlined" onClick={() => { openComponent("add") }}>Add Post</Button>
                            </div>
                        </div>
                        <Grid container sx={{ flexGrow: 1 }}>
                            {postData()}
                        </Grid>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={() => { setAnchorEl(null) }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{ p: 2, cursor: "pointer" }}><ModeEditIcon onClick={() => { openComponent("edit") }} /> </Typography>
                            <Typography sx={{ p: 2, cursor: "pointer" }}><VisibilityIcon onClick={() => { openComponent("view") }} /></Typography>
                            <Typography sx={{ p: 2, cursor: "pointer" }}><DeleteIcon onClick={() => { openComponent("delete") }} /></Typography>
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
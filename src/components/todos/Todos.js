import React, { useEffect,useState } from 'react';
import Header from "../common/Header";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Container, Box, Button, Typography, Popover} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from "../../utilities/Modal";
import moment from 'moment';
import { fetchPosts ,fetchUser} from "../../redux/actions/commonAction";
const Todos = () => {
    let todos = useSelector((state) => state.commonReducer.todos);
    const [OpenModel, setOpenModel] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [post, setPost] = useState(null);
    const [type, setType] = useState("");
    const [refreshComp,setRefreshComp] = useState(false);
    const dispatchAction = useDispatch();
    useEffect( () => {
        const fetchData = async () => {
            await dispatchAction(fetchUser());
            await dispatchAction(fetchPosts())
        }
        fetchData();
    }, [OpenModel,refreshComp,dispatchAction])
    
    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget)
        setPost(item)
    }

    const postData = () => {
        return (todos || []).map((item, index) => {
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
                                <p className="desc"><strong>Due On : </strong> {moment(item.due_on).format("DD-MM-YYYY")}</p>
                                <p className="desc"><strong>Status : </strong>{item.status}</p>
                            </div>
                        </div>
                    </Box>
                </Grid>
            )
        })
    }
    

    const openComponent = (type) => {
        setType(type);
        setOpenModel(true);
    }
    const openDialog = (OpenModel) => {
        if (type === "add todo") {
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
                {(todos && todos.length) ?
                    <>
                        <div className='btn-right'>
                            <div className=''>
                                <Button sx={{ ml: 2 }} variant="outlined" onClick={() => { openComponent("add todo") }}>Add Todo</Button>
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
                            <Typography sx={{ p: 2, cursor: "pointer" }}><DeleteIcon onClick={() => { openComponent("delete todo") }} /></Typography>
                        </Popover>
                    </>
                    :
                    <div>
                        <h3>No Todos Fond</h3>
                    </div>
                }
            </Container>
        </>
    )
}
export default Todos;
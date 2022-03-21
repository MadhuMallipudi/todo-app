import React,{useEffect} from 'react';
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import { Container,Box,Paper} from '@mui/material';
import Header from "./common/Header";
import { useDispatch,useSelector } from 'react-redux'
import {fetchPosts} from "../redux/actions/commonAction";
const Home = () => {
    const postsCount = useSelector((state) => state.commonReducer.postsCount);
    const todosCount = useSelector((state) => state.commonReducer.todosCount);
    const commentsCount = useSelector((state) => state.commonReducer.commentsCount);
    console.log("postsCount",postsCount)
    let dispatchAction = useDispatch();
    useEffect(async()=>{
         await dispatchAction(fetchPosts())
    },[])
    return (
        <>
            <Header/>
            <Container maxWidth="sm" sx={{mt:5}}>
                <Box
                    sx={{
                        display:"flex",
                        '& > : not(style)':{
                            m:3,
                            width:128,
                            height:128,
                            textAlign:"center"
                        },
                    }}
                   >
                    <Paper variant="outlined">
                        <h4>Posts</h4>
                        <p>{postsCount}</p>
                    </Paper>
                    <Paper variant="outlined">
                        <h4>Comments</h4>
                        <p>{commentsCount}</p>
                    </Paper>
                    <Paper variant="outlined">
                        <h4>ToDo</h4>
                        <p>{todosCount}</p>
                    </Paper>
                   </Box> 
            </Container>
        </>
    )
}

export default Home;
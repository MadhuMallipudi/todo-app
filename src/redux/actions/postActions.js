import { FETCH_POSTS, FETCH_TODOS, FETCH_COMMENTS,CREATE_POST } from "../constants";
import { callApi } from "../../callApi";

export const fetchPosts = () => async (dispatch) => {
    const urls = [
        { url: "https://gorest.co.in/public/v2/posts", actionType: FETCH_POSTS },
        { url: "https://gorest.co.in/public/v2/todos", actionType: FETCH_TODOS },
        { url: "https://gorest.co.in/public/v2/comments", actionType: FETCH_COMMENTS },
    ]
    for (let ele of urls) {
        let response = await callApi(ele.url, "GET", "", "");
        if (response) {
            dispatch({
                type: ele.actionType,
                payload: response.data
            })
        } else {
            dispatch({
                type: ele.actionType,
                payload: []
            })
        }
    }
}

export const createPost = (addPost) => async (dispatch) => {
    let data = addPost;   
    let response = await callApi("https://gorest.co.in/public/v2/posts","POST","",data);
    if(response){
        dispatch({
            type:CREATE_POST,
            payload:response.data
        })
    }
    await fetchPosts(); 
    // else {
    //     dispatch({
    //         type:CREATE_POST,
    //         payload:response.data
    //     })
    // }
}

// export const getTodos = (dispatch) => async (dispatch) => {
//     let response = awa
// } 
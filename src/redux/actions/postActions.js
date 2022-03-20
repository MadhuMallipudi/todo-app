import { FETCH_POSTS, FETCH_TODOS, FETCH_COMMENTS } from "../constants";
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

export const savePost = (post,postType) => async (dispatch) => {
    let method = postType === "edit" ? "PUT" : "POST"; 
    await callApi("https://gorest.co.in/public/v2/posts",method,post);
    fetchPosts(); 
}

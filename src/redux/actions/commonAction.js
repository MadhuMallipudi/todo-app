import { FETCH_POSTS, FETCH_TODOS, FETCH_COMMENTS, FETCH_USER } from "../constants";
import { callApi } from "../../callApi";
import configuVariables from "../../config";
const { baseUrl } = configuVariables
export const fetchPosts = () => async (dispatch) => {
    const urls = [
        { url: `${baseUrl}/public/v2/posts`, actionType: FETCH_POSTS },
        { url: `${baseUrl}/public/v2/todos`, actionType: FETCH_TODOS },
        { url: `${baseUrl}/public/v2/comments`, actionType: FETCH_COMMENTS },
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

export const getPosts = () => async (dispatch) => {
    let response = await callApi(`${baseUrl}/public/v2/posts`, "GET", "", "");
    if (response) {
        dispatch({
            type: FETCH_POSTS,
            payload: response.data
        })
    } else {
        dispatch({
            type: FETCH_POSTS,
            payload: []
        })
    }
}



export const fetchUser = () => async (dispatch) => {
    let user = await callApi(`${baseUrl}/public/v2/users`, "GET", "");
    let activeUser = (user?.data || []).find((ele) => ele.status === "active");
    if (activeUser) {
        dispatch({
            type: FETCH_USER,
            payload: { userInfo: activeUser, message: "user found" }
        })
    } else {
        dispatch({
            type: FETCH_USER,
            payload: { userInfo: {}, message: "user not found" }
        })
    }

}
export const savePost = (post, postType) => async (dispatch) => {
    let method = postType === "edit" ? "PUT" : "POST";
    let url = postType === "edit" ? `${baseUrl}/public/v2/posts/${post.post_id}` : `${baseUrl}/public/v2/posts`
    await callApi(url, method, post);
}

export const deletePost = (postID) => async (dispatch) => {
    await callApi(`${baseUrl}/public/v2/posts/${postID}`, "DELETE", "");
    dispatch({
        type: "DELETE_POST",
        payload: { message: `${postID} deleted successfully` }
    })
}

export const postComment = (comment) => async (dispatch) => {
    await callApi(`${baseUrl}/public/v2/posts/${comment.post_id}/comments`, "POST", comment)
    fetchPosts();
}

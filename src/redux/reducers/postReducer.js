import { FETCH_POSTS ,FETCH_TODOS,FETCH_COMMENTS,FETCH_USER,DELETE_POST} from "../constants";

const  commonReducer = (state={},{type,payload}) => {
    switch (type) {
        case FETCH_POSTS: return { ...state,posts:payload,postsCount:payload.length }
        case FETCH_TODOS: return { ...state,todos:payload,todosCount:payload.length }
        case FETCH_COMMENTS: return { ...state,comments:payload,commentsCount:payload.length }
        case FETCH_USER: return { ...state,userInfo:payload }
        case DELETE_POST: return {...state,deltedPostID:payload}
        default: return {...state}
    }
}

export default commonReducer;
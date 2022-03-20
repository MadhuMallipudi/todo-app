import { FETCH_POSTS ,FETCH_TODOS,FETCH_COMMENTS} from "../constants";

const  commonReducer = (state={},{type,payload}) => {
    switch (type) {
        case FETCH_POSTS: return { ...state,posts:payload,postsCount:payload.length }
        case FETCH_TODOS: return { ...state,todos:payload,todosCount:payload.length }
        case FETCH_COMMENTS: return { ...state,comments:payload,commentsCount:payload.length }
        default: return {...state}
    }
}

export default commonReducer;
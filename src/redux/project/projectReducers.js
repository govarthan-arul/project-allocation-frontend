import { FETCH_PROJECT_FAILURE, FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS } from "./projectTypes"

const initState = {
    loading: false,
    projects: [],
    error: ''
}
const reducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_PROJECT_REQUEST:
            return{
                ...state,
                loading: true
            }
        case FETCH_PROJECT_SUCCESS:
            return{
                ...state,
                loading: false,
                projects: action.payload,
                error: ''
            }
        case FETCH_PROJECT_FAILURE:
            return{
                ...state,
                loading: false,
                projects: [],
                error: action.payload
            }
        default: return state
    }
}
export default reducer
const SET_ISSUES = 'SET_ISSUES'


const defaultState = {
    items: [], 
    isFetching: true
}

export default function issuesReducer (state = defaultState, action){
switch(action.type){
    case SET_ISSUES: 
    return {
        ...state,
        items: action.payload.items
    }
    default: 
    return state
}
}

export const setIssues = (issues) => ({type: SET_ISSUES, payload: issues})
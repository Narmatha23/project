import { SET_STUDENT,  SET_FLAG } from '../actionTypes'

import isEmpty from '../validation/is-empty'

const initialState = {
    isAuthenticated: false,
    student: {},
    alongsideStudent: {},
    flag: false,
    regNumStudent: {},
    allSubjects: [],
    // allSubjects:{},
}


const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STUDENT:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                student: action.payload
            }
      
        case SET_FLAG:
            return {
                ...state,
                flag: true
            }
       
        case "GET_STUDENT_BY_REG_NUM": {
            return {
                ...state,
                regNumStudent: action.payload
            }
        }
       
        
        case "GET_ALL_SUBJECTS": 
            return {
                ...state,
                allSubjects: action.payload
            }
        
        default:
            return state
        
    } 
}

export default studentReducer
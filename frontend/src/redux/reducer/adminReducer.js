import { SET_ADMIN, GET_SUBJECTS }  from '../actionTypes'
import isEmpty from '../validation/is-empty'

const initialState = {
    isAuthenticated: false,
    admin: {},
    adminAddStudentFlag: false,
    adminAddAdminFlag: false,
    adminAddSubjectFlag: false,
    flag: false,
    allFaculty: [],
    allStudent:[],
    allSubject:{},
    allSubject: [],
    student:{}
}






const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN: 
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                admin: action.payload
            }
        case GET_SUBJECTS: {
            return {
                ...state,
                allSubject: action.payload
            }
        }
        
        case "ADMIN_ADD_STUDENT_FLAG": {
            return {
                ...state,
                adminAddStudentFlag: action.payload
            }
        }
        case "ADMIN_ADD_SUBJECT_FLAG": {
            return {
                ...state,
                adminAddSubjectFlag: action.payload
            }
        }
        case "ADMIN_ADD_ADMIN_FLAG": {
            return {
                ...state,
                adminAddAdminFlag: action.payload
            }
        }
        
        case "GET_ALL_STUDENT": {
            return {
                ...state,
                allStudent: action.payload
            }
        }
        case "GET_ALL_SUBJECT": {
            return {
                ...state,
                allSubject: action.payload
            }
        }
        
        
        default:
            return state
    }
}



export default adminReducer
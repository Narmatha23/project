import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import {
    SET_ADMIN, SET_ERRORS, 
    GET_SUBJECTS
} from '../actionTypes'



const setAdmin = (data) => {
    return {
        type: SET_ADMIN,
        payload: data
    }
}



const adminAddStudentFlag = (data) => {
    return {
        type: "ADMIN_ADD_STUDENT_FLAG",
        payload: data
    }
}

const adminAddSubjectFlag = (data) => {
    return {
        type: "ADMIN_ADD_SUBJECT_FLAG",
        payload: data
    }
}

const adminAddAdminFlag = (data) => {
    return {
        type: "ADMIN_ADD_ADMIN_FLAG",
        payload: data
    }
}

const getSubjctsHelper = (data) => {
    return {
        type: GET_SUBJECTS,
        payload: data
    }
}
const getAllSubjectsHelper = (data) => {
    return {
        type: "GET_ALL_SUBJECTS",
        payload: data
    }
}


const adminGetAllStudentHelper = (data) => {
    return {
        type: "GET_ALL_STUDENT",
        payload: data
    }
}


const adminGetAllSubjectHelper = (data) => {
    return {
        type: "GET_ALL_SUBJECT",
        payload: data
    }
}

const getAllStudentsHelper = (data) => {
    return {
        type: "GET_ALL_STUDENTS",
        payload: data
    }
}
const fetchStudentsHelper = (data) => {
    return {
        type: "FETCH_STUDENTS",
        payload: data
    }
}

const subjectCodeListHelper = (data) => {
    return {
        type: "GET_SUBJECTCODE_LIST",
        payload: data
    }
}
// https://apna-erp.herokuapp.com
// https://apna-erp.herokuapp.com
// http://localhost:5000
export const adminLogin = (adminCredential) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: "http://127.0.0.1:5000/api/admin/adminLogin",
                data: adminCredential
            })
            const { token } = data;
            // Set token to local Storage
            localStorage.setItem('adminJwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setAdmin(decoded))
        }
        catch (err) {
           
            console.log(err)
        }
    }
}

export const adminGetAllSubjects = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: "http://127.0.0.1:5000/api/admin/getSubjects",
            })
            dispatch(getSubjctsHelper(data))
        }
        catch (err) {
            console.log("Error in getting all subjects", err.message)
        }
    }
}



export const adminAddSubject = (subjectCredential) => {
    return async (dispatch) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const { data } = await axios({
                method: 'Post',
                url: "http://127.0.0.1:5000/api/admin/addSubject",
                data: subjectCredential
            })
            dispatch(adminAddSubjectFlag(true))
            alert("Subject Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const adminAddAdmin = (adminCredentails) => {
    return async (dispatch) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const { data } = await axios({
                method: 'Post',
                url: "http://127.0.0.1:5000/api/admin/addAdmin",
                data: adminCredentails
            })
            dispatch(adminAddAdminFlag(true))
            alert("Admin Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const adminAddStudent = (studentCredential) => {
    return async (dispatch) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const { data } = await axios({
                method: 'Post',
                url: "http://127.0.0.1:5000/api/admin/addstudent",
                data: studentCredential
            })
            dispatch(adminAddStudentFlag(true))
            alert("Student Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const adminGetAllStudent = (searchCredential) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'post',
                url: `http://127.0.0.1:5000/api/admin/getAllStudent`,
                data:searchCredential
            })
            dispatch(adminGetAllStudentHelper(data.result))
        }
        catch (err) {
            console.log(err)
        }
    }
}
export const getAllStudents = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: "http://127.0.0.1:5000/api/admin/getAllStudents",
               
            })
            dispatch(getAllStudentsHelper(data.result))
        }
        catch (err) {
              console.log(err)
            }
        }
    }


export const adminGetAllSubject = (department,year) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'get',
                url: `http://127.0.0.1:5000/api/admin/getAllSubject?department=${department}&year=${year}`,
            })
            dispatch(adminGetAllSubjectHelper(data.result))
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const getAllSubject = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: "http://127.0.0.1:5000/api/admin/getAllSubjects"
            })
            dispatch(getAllSubjectsHelper(data.result))
        }
        catch (err) {
            console.log("Error in sending message", err.message)
        }
    }
}

export const fetchStudents = (department, year, section) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: "http://127.0.0.1:5000/api/admin/fetchStudents",
                data: { department, year, section}
            })
            dispatch(fetchStudentsHelper(data.result))
            dispatch(subjectCodeListHelper(data.subjectCode))
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const setAdminUser = data => {
    return {
        type: SET_ADMIN,
        payload: data
    };
}

export const adminLogout = () =>
    (dispatch) => {
        // Remove token from localStorage
        localStorage.removeItem('adminJwtToken');
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to {} which will set isAuthenticated to false
        dispatch(setAdmin({}));
    };
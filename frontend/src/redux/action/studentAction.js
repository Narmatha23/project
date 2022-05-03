import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import { SET_STUDENT,GET_ALL_SUBJECTS } from '../actionTypes'
import { console } from 'browserify/lib/builtins';




const setStudent = (data) => {
    return {
        type: SET_STUDENT,
        payload: data
    }
}


const getStudentByRegNameHelper = (data) => {
    return {
        type: "GET_STUDENT_BY_REG_NUM",
        payload: data
    }
}



const getAllSubjectsHelper = (data) => {
    return {
        type: "GET_ALL_SUBJECTS",
        payload: data
    }
}



export const studentLogin = (studentCredential) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: "http://127.0.0.1:5000/api/student/login",
                data: studentCredential
            })
            const { token } = data;
            // Set token to local Storage
            localStorage.setItem('studentJwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setStudent(decoded))
           
        }
        catch (err) {
            // console.log(err)
        }
    }
}


export const getStudentByRegName = (registrationNumber) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: "http://127.0.0.1:5000/api/student/getStudentByRegNumber",
                data: { registrationNumber }
            })
            dispatch(getStudentByRegNameHelper(data.result))
        }
        catch (err) {
            console.log('Error in getting student by registration number', err.message)
        }
    }
    
}


export const getAllSubjects = (registrationNumber) => {

    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'get',
                // url: `http://127.0.0.1:5000/api/student/getAllSubjects?department=${department}&year=${year}`
                 url: `http://127.0.0.1:5000/api/student/getAllSubjects?registrationNumber=${registrationNumber}`
            })
            dispatch(getAllSubjectsHelper(data.result))
        }
        catch (err) {
            // console.log("Error in sending message", err)
        }
    }
}


export const setStudentUser = data => {
    return {
        type: SET_STUDENT,
        payload: data
    };
}

export const studentLogout = () =>
    (dispatch) => {
        // Remove token from localStorage
        localStorage.removeItem('studentJwtToken');
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to {} which will set isAuthenticated to false
        dispatch(setStudent({}));
    };
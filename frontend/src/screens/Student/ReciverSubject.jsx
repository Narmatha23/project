import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getAllSubjects } from '../../redux/action/studentAction'

const RecieverSubject = (props) => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()

    const [registrationNumber, setRegistrationNumber] = useState("")
  


    useEffect(() => {
        setRegistrationNumber(props.match.params.registrationNumber)
        dispatch(getAllSubjects(registrationNumber))
        
    }, [props.match.params.registrationNumber,registrationNumber,dispatch]) 

   


    return (
        <div>
            {store.student.isAuthenticated ? <>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-7">
                                    <table className="table border">
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{store.student.subjects.allSubjects.subjectName}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{store.student.allSubjects.subjectCode}</td>
                                            </tr>
                                            <tr>
                                                <td>Registration Number</td>
                                                <td>{store.student.allSubjects.registrationNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>Year</td>
                                                <td>{store.student.allSubjects.year}</td>
                                            </tr>
                                            <tr>
                                                <td>Department</td>
                                                <td>{store.student.allSubjects.department}</td>
                                            </tr>
                                            <tr>
                                                <td>Department</td>
                                                <td>{store.student.allSubjects.noOfSubjects}</td>
                                            </tr>
                                           
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                       
                        </div>

                    </div>
                </div>





            </> : (history.push('/'))}
        </div>

    )
}

export default RecieverSubject
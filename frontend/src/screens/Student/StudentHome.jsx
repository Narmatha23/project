import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {
  studentLogout,
  getAllSubjects,
} from '../../redux/action/studentAction';
import { Row, Col } from 'react-bootstrap';
import '../../style/studentHome.css';
const StudentHome = () => {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // let department = store.student.student.student.department
    // let year= store.student.student.student.year
    console.log(store);
    let registrationNumber = store.student.student.student.registrationNumber;
    dispatch(getAllSubjects(registrationNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(studentLogout());
    history.push('/adminLogin');
  };

  return (
    <div>
      {store.student.isAuthenticated ? (
        <>
          <div className='container-fluid topbar'>
            <span className='top-design '></span>{' '}
          </div>
          <div className='container'>
            <div
              className='col-md-12 col-xs-9  logo-section'
              style={{ paddingTop: '20px' }}
            >
              <div className='col-md-3 col-xs-9' style={{ zIndex: '9' }}>
                <img
                  src='https://i.ibb.co/FHJCy8d/UNIVERSITY-COLLEGE-OF-ENGINEERING-KANCHEEPURAM-Constituent-College-of-Anna-university-Approved-by-AI.png'
                  alt='University College Of Engineering'
                  class='stud-logo'
                  title='University College Of Engineering (UCEK), Kancheepuram'
                  // className='d-inline-block align-top'
                  onClick={logoutHandler}
                />
              </div>
            </div>
            <div
              class='col-md-12'
              style={{
                borderTop: '1px solid #CCCCCC',
                margin: '20px 0 10px',
              }}
            ></div>
          </div>
          <div className=' stud-profile'>
            <div className='container'>
              <div class='card border-primary mb-3 box-shadow'>
                <div class='card-header'>PROFILE</div>
                <div class='card-body'>
                  <table className='table '>
                    <tbody className='text-black'>
                      <tr>
                        <td className='tab-heading'>Name</td>
                        <td>:</td>
                        <td style={{ textTransform: 'uppercase' }}>
                          {store.student.student.student.name}
                        </td>
                        <td className='tab-heading'>Registration Number</td>
                        <td>:</td>
                        <td>
                          {store.student.student.student.registrationNumber}
                        </td>
                      </tr>
                      <tr>
                        <td className='tab-heading'>Department</td>
                        <td>:</td>
                        <td style={{ textTransform: 'uppercase' }}>
                          {store.student.student.student.department}
                        </td>
                        <td className='tab-heading'>Year</td>
                        <td>:</td>
                        <td>{store.student.student.student.year}</td>
                      </tr>
                      <tr>
                        <td className='tab-heading'>semester</td>
                        <td>:</td>
                        <td>{store.student.student.student.semester}</td>
                        <td className='tab-heading'>dob</td>
                        <td>:</td>
                        <td>{store.student.student.student.dob}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row mt-5'>
              <div style={{ marginLeft: '20px' }}>
                <table className='table border'>
                  <thead
                    style={{
                      fontSize: '25px',
                    }}
                  >
                    <tr>
                      <th scope='col'>S.No</th>
                      <th scope='col'>Subject Code</th>
                      <th scope='col'>Subject Name</th>
                      {/* <th scope="col">Year</th>
                                        <th scope="col">Total Lectures</th> */}
                    </tr>
                    
                  </thead>
                  <tbody>
                    {store.student.allSubjects.map((res, index) => (
                      <tr key={index}>
                        <th scope='row'>{index + 1}</th>
                        <td>{res.subjectCode}</td>
                        <td>{res.subjectName}</td>
                        {/* <td>{res.year}</td>
                                                <td>{res.totalLectures}</td> */}
                      </tr>
                    ))}
                    {/* <tr>
                      <td
                        colspan='3'
                        style={{
                          textAlign:'right',
                          fontWeight:'bold',
                          fontSize:'50px'
                        }}
                      >
                        Total
                      </td>
                      <td style={{
                        textAlign:'rignt',
                        fontWeight:'bold'                      }}>
                        Rs. <span class='amtClass'>1200</span>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        history.push('/')
      )}
    </div>
  );
};

export default StudentHome;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import classnames from 'classnames';
import { adminAddStudent, adminLogout } from '../../redux/action/adminAction';

import '../../style/AdminNavbar.css';

const AdminAddStudent = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (store.error) {
      setError(store.error);
    }
  }, [store.error]);
  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      adminAddStudent({
        name,
        email,
        registrationNumber,
        year,
        department,
        dob: dob.split('/').reverse().join('/'),
        gender,
        semester
      })
    );
  };
  useEffect(() => {
    if (store.admin.adminAddStudentFlag) {
      setError({});
    }
  }, [store.admin.adminAddStudentFlag]);

  useEffect(() => {
    if (store.error || store.admin.adminAddStudentFlag) {
      setIsLoading(false);
    }
  }, [store.error, store.admin.adminAddStudentFlag]);

  const logoutHandler = () => {
    dispatch(adminLogout());
    history.push('/adminLogin');
  };

  return (
    <div>
      {store.admin.isAuthenticated ? (
        <>
          <input type='checkbox' id='nav-toggle' />
          <div className='side-bar'>
            <div className='brand'>
              <h2>
                <span className='lab '>
                <img
                alt=''
                src='https://www.nicepng.com/png/full/944-9441929_anna-university-logo-png.png'
                width='30'
                height='30'
                className='d-inline-block align-top'
              />
              
                </span>
                <span style={{color:"white" }}>UCEK</span>
              </h2>
            </div>

            <div className='sidebar-menu'>
              <ul>
                <li>
                  <Link to='/admin'>
                    <span className='las la-igloo'></span>
                    <span>Dashbord</span>
                  </Link>
                </li>
                <li>
                  <Link to='/admin/addStudent' className='active'>
                    <span className='las la-users'></span>
                    <span>ADD STUDENT</span>
                  </Link>
                </li>
                <li>
                  <Link to='/admin/fourthyear'>
                    <span className='las la-user-circle'></span>
                    <span>HOME</span>
                  </Link>
                </li>
                <li>
                  <Link to = "/admin/addSubject">
                    <span className='las la-clipboard-list'></span>
                    <span>ADD SUBJECT</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='main-content'>
            <header className='nav-header'>
              <h1 className='nav-title'>
                <label for='nav-toggle'>
                  <span className='las la-bars'></span>
                </label>
                Add Student
              </h1>
              <div className='search-wrapper'>
                <span className='las la-search'></span>
                <input type='search' placeholder='search here' />
              </div>
              <Link to='/adminLogin' onClick={logoutHandler}>
                <div className='user-wrapper'>
                  <div>
                    <h4>ADMIN</h4>
                  </div>
                </div>
              </Link>
            </header>
            <main className='content'>
              <div className='container mt-5'>
                <div className='row '>
                  <div className='col'>
                    <form noValidate onSubmit={formHandler}>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label htmlFor='nameId'>Student Name</label>
                            <input
                              onChange={(e) => setName(e.target.value)}
                              type='text'
                              className={classnames('form-control', {
                                'is-invalid': error.name,
                              })}
                              id='nameId'
                            />
                            {error.name && (
                              <div className='invalid-feedback'>
                                {error.name}
                              </div>
                            )}
                          </div>
                          <div className='form-group'>
                            <label htmlFor='emailId'>Email</label>
                            <input
                              onChange={(e) => setEmail(e.target.value)}
                              type='email'
                              className={classnames('form-control', {
                                'is-invalid': error.email,
                              })}
                              id='emailId'
                            />
                            {error.email && (
                              <div className='invalid-feedback'>
                                {error.email}
                              </div>
                            )}
                          </div>
                          <div className='form-group'>
                            <label className="form-label mt-4">Department</label>
                            <select
                              onChange={(e) => setDepartment(e.target.value)}
                              className={classnames('form-control', {
                                'is-invalid': error.department,
                              })}
                              id='departmentId'
                            >
                              <option>Select</option>
                              <option value='E.C.E'>E.C.E</option>
                              <option value='computer science engineering'>C.S.E</option>
                              <option value='E.E.E'>E.E.E</option>
                              <option value='Mechanical'>Mechanical</option>
                            </select>
                            {error.department && (
                              <div className='invalid-feedback'>
                                {error.department}
                              </div>
                            )}
                          </div>
                          <div className='form-group'>
                            <label htmlFor='yearId'>Year</label>
                            <select
                              onChange={(e) => setYear(e.target.value)}
                              className={classnames('form-control', {
                                'is-invalid': error.year,
                              })}
                              id='yearId'
                            >
                              <option>Select</option>
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                            </select>
                            {error.year && (
                              <div className='invalid-feedback'>
                                {error.year}
                              </div>
                            )}
                          </div>
                          <div className='form-group'>
                            <label htmlFor='semesterId'>Semester</label>
                            <select
                              onChange={(e) => setSemester(e.target.value)}
                              className={classnames('form-control', {
                                'is-invalid': error.semester,
                              })}
                              id='yearId'
                            >
                              <option>Select</option>
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                            </select>
                            {error.semester && (
                              <div className='invalid-feedback'>
                                {error.semester}
                              </div>
                            )}
                          </div>

                          <div className='form-group'>
                            <label htmlFor='registrationNumberId'>
                              RegistrationNumber
                            </label>
                            <input
                              onChange={(e) =>
                                setRegistrationNumber(e.target.value)
                              }
                              type='text'
                              className={classnames('form-control', {
                                'is-invalid': error.registrationNumber,
                              })}
                              id='registrationNumberId'
                            />
                            {error.registrationNumber && (
                              <div className='invalid-feedback'>
                                {error.registrationNumber}
                              </div>
                            )}
                          </div>
                          <div class='form-group'>
                            <label htmlFor='dobId'>DOB</label>
                            <input
                              onChange={(e) => setDob(e.target.value)}
                              type='date'
                              className={classnames('form-control', {
                                'is-invalid': error.dob,
                              })}
                              id='dobId'
                            />
                            {error.dob && (
                              <div className='invalid-feedback'>
                                {error.dob}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label htmlFor='genderId'>Gender</label>
                            <select
                              onChange={(e) => setGender(e.target.value)}
                              class='form-control'
                              id='genderId'
                            >
                              <option>Select</option>
                              <option value='Male'>Male</option>
                              <option value='Female'>Female</option>
                              <option value='Other'>Other</option>
                            </select>
                          </div>
                         
                        </div>
                      </div>
                      <br/>
                      <div class='row justify-content-center'>
                        <div class='col-md-1'>
                          {isLoading && (
                            <div
                              class='spinner-border text-primary'
                              role='status'
                            >
                              <span class='sr-only'>Loading...</span>
                            </div>
                          )}
                        </div>
                      </div>
                     
                      {!isLoading && (
                       
                       <button type='submit' className='btn btn-info  '>
                         Add Student
                       </button>
                       
                     )}
                      
                    </form>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        history.push('/')
      )}
    </div>
  );
};

export default AdminAddStudent;

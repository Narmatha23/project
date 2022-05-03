import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory,Link } from 'react-router-dom'
import classnames from 'classnames'
import { adminAddSubject,adminLogout } from '../../../../redux/action/adminAction'


const AdminAddSubject = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [subjectName, setSubjectName] = useState('')
    const [subjectCode, setSubjectCode] = useState('')
    const [  noOfSubjects, setNoOfSubjects] = useState('');
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])
    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminAddSubject({
            subjectCode,
            subjectName,
            noOfSubjects,
            department,
            year
        }))
    }

    useEffect(() => {
        if (store.admin.adminAddSubjectFlag) {
            setError({})
        }
    }, [store.admin.adminAddSubjectFlag])

    useEffect(() => {
        if (store.error || store.admin.adminAddSubjectFlag) {
            setIsLoading(false)
        }
    }, [store.error, store.admin.adminAddSubjectFlag])
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
                  <span className='lab la-accusoft'></span>
                  <span>UCEK</span>
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
                    <Link to='/admin/addStudent'>
                      <span className='las la-users'></span>
                      <span>ADD STUDENT</span>
                    </Link>
                  </li>
                  <li>
                    <Link to='admin/fourthyear'>
                      <span className='las la-user-circle'></span>
                      <span>HOME</span>
                    </Link>
                  </li>
                  <li>
                    <Link to ='/'>
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
                  AddSubject
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
                  <div className='row justify-content-center'>
                    <div className='col-md-4'>
                      <div className='d-flex justify-content-md-center vh-100'>
                        <form noValidate onSubmit={formHandler}>
                        <div className='form-group'>
                            <label htmlFor='  noOfSubjectsrId'>
                            noOfSubjects
                            </label>
                            <input
                              onChange={(e) =>
                                setNoOfSubjects(e.target.value)
                              }
                              type='text'
                              className={classnames('form-control', {
                                'is-invalid': error.noOfSubjects,
                              })}
                              id='registrationNumberId'
                            />
                            {error.noOfSubjects && (
                              <div className='invalid-feedback'>
                                {error.noOfSubjects}
                              </div>
                            )}
                          </div>
                          <div className='form-group'>
                            <label htmlFor='snameId'>Subject Name</label>
                            <input
                              onChange={(e) => setSubjectName(e.target.value)}
                              type='text'
                              className={classnames('form-control', {
                                'is-invalid': error.subjectName,
                              })}
                              id='snameId'
                            />
                            {error.subjectName && (
                              <div className='invalid-feedback'>
                                {error.subjectName}
                              </div>
                            )}
                          </div>
                          <div className='form-group'>
                            <label htmlFor='scodeId'>Subject Code</label>
                            <input
                              onChange={(e) => setSubjectCode(e.target.value)}
                              type='text'
                              className={classnames('form-control', {
                                'is-invalid': error.subjectCode,
                              })}
                              id='scodeId'
                            />
                            {error.subjectCode && (
                              <div className='invalid-feedback'>
                                {error.subjectCode}
                              </div>
                            )}
                          </div>
                          
                          <div className='form-group'>
                            <label htmlFor='departmentId'>Department</label>
                            <select
                              onChange={(e) => setDepartment(e.target.value)}
                              className={classnames('form-control', {
                                'is-invalid': error.department,
                              })}
                              id='departmentId'
                            >
                              <option>Select</option>
                              <option value='E.C.E'>E.C.E</option>
                              <option value='E.E.E'>E.E.E</option>
                              <option value='C.S.E'>C.S.E</option>
                              
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
                          {!isLoading && (
                            <button type='submit' className='btn btn-info ' style={{marginTop:'10px'}}>
                              Add Subject
                            </button>
                          )}
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
                         
                        </form>
                      </div>
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

export default AdminAddSubject
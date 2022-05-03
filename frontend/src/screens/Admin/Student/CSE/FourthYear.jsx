import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 adminLogout,
  adminGetAllStudent,
} from '../../../../redux/action/adminAction';
import { useHistory,Link } from 'react-router-dom';
import classnames from 'classnames';
import '../../../../style/fourthyear.css'
const FourthYear = (props) => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({});
  const history = useHistory();

  const formHandler = (e) => {
      e.preventDefault()
      setIsLoading(true)
      dispatch(adminGetAllStudent({ department, year }))
  }

  useEffect(() => {
    if (store.admin.allStudent.length !== 0) {
        setIsLoading(false)
    }

}, [store.admin.allStudent.length])
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
                    <Link to='/admin/fourthyear'>
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
                  STUDENT DETAILS
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
            <div className='row mt-5'>
              <div className='col-md-4'>
                <form noValidate onSubmit={formHandler}>
                                <div className="form-group">
                                    <label htmlFor="departmentId">Department</label>
                                    <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                        {
                                            'is-invalid': error.department
                                        })} id="departmentId">
                                        <option>Select</option>
                                        <option value="E.C.E">E.C.E</option>
                                        <option value="computer science engineering">C.S.E</option>
                                        <option value="E.E.E">E.E.E</option>
                                        <option value="Mechanical">Mechanical</option>
                                    </select>
                                    {error.department && (<div className="invalid-feedback">{error.department}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="yearId">Year</label>
                                    <select onChange={(e) => setYear(e.target.value)} className={classnames("form-control",
                                        {
                                            'is-invalid': error.year
                                        })} id="yearId">
                                        <option>Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    {error.year && (<div className="invalid-feedback">{error.year}</div>)}
                                  <div className='search-btn'>
                                  {!isLoading && <button type="submit" className="btn btn-info btn-block  ">Search</button>}
                                  </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-1">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                
                              
                               
                            </form>
              </div>
              <div className='col-md-8'>
              {store.admin.allStudent.length !== 0 &&  <table className='table border'>
                  <thead>
                    <tr>
                      <th scope='col'>S.No</th>
                      <th scope='col'>Registration Number</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.admin.allStudent.map((res, index) => (
                      <tr key={index}>
                        <th scope='row'>{index + 1}</th>
                        <td>{res.registrationNumber}</td>
                        <td>{res.name}</td>
                        <td>{res.email}</td>
                        {/* <td>subjects</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>}
              </div>
            </div>
          </main>
     </div>   </>
      ) : (
        history.push('/')
      )}
    </div>
  );
};

export default FourthYear;

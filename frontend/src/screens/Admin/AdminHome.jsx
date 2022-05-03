import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { Tabs, Tab } from 'react-bootstrap';
import { fetchStudents } from '../../redux/action/adminAction';
import classnames from 'classnames';
import '../../style/adminHome.css';
const AdminHome = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const [error, setError] = useState({});

  //   const getDetails = (e,year,row) => {
  //     history.push({
  //         pathname: "/admin/fourthyear",
  //         params: {
  //             year: year.value,
  //             department: year.department
  //         }
  //     })

  // }
  //   const [studentDepartmentList] = useState([
  //     {
  //       departmentName: 'Computer Science engineering',
  //       cardclassName: 'card__picture--1',
  //       headingclassName:'card__heading-span--1',
  //       departmentValue:'computer science engineering',
  //       years: [
  //         {
  //           label: 'First year',
  //           value: '1',
  //           department:'computer science engineering'
  //         },
  //         {
  //           label: 'Second year',
  //           value: '2',
  //         },
  //         {
  //           label: 'Third Year',
  //           value: '3',
  //         },
  //         {
  //           label: 'Fourth year',
  //           value: '4',
  //           department:'computer science engineering'
  //         },
  //       ],
  //     },
  //     {
  //       departmentName: 'Mechanical',
  //       cardclassName: 'card__picture--2',
  //       headingclassName:'card__heading-span--2',
  //       departmentValue:'Mechanical',
  //       years: [
  //         {
  //           label: 'First year',
  //           value: '1',
  //         },
  //         {
  //           label: 'Second year',
  //           value: '2',
  //         },
  //       ],
  //     },
  //   ]);

  return (
    <div>
      {store.admin.isAuthenticated ? (
        <>
          <Header />
          <div className='conatiner'>
            <Tabs
              defaultActiveKey='profile'
              id='uncontrolled-tab-example'
              className='mb-3'
            >
              <Tab eventKey='home' title='FEES DETAILS'>
                <section className='section-tours'>
                  <div className='row'>
                    <div className='column'>
                      <div className='card-detail'>
                        <div class='card__side card__side--front'>
                          <div class='card__picture card__picture--1'>
                            &nbsp;
                          </div>
                          <h4 class='card__heading'>
                            <span class='card__heading-span card__heading-span--1'>
                              COMPUTER SCIENCE
                            </span>
                          </h4>
                          <div class='card__details'>
                            <ul>
                              <Link to='/studentDetail'>
                                {' '}
                                <li> FIRST YEAR</li>{' '}
                              </Link>
                              <li>SECOND YEAR</li>
                              <li>THIRD YEAR</li>
                              <li>FOURTH YEAR</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='column'>
                      <div className='card-detail'>
                        <div class='card__side card__side--front'>
                          <div class='card__picture card__picture--2'>
                            &nbsp;
                          </div>
                          <h4 class='card__heading'>
                            <span class='card__heading-span card__heading-span--2'>
                              COMPUTER SCIENCE
                            </span>
                          </h4>
                          <div class='card__details'>
                            <ul>
                              <Link to='/studentDetail'>
                                {' '}
                                <li> FIRST YEAR</li>{' '}
                              </Link>
                              <li>SECOND YEAR</li>
                              <li>THIRD YEAR</li>
                              <li>FOURTH YEAR</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='column'>
                      <div className='card-detail'>
                        <div class='card__side card__side--front'>
                          <div class='card__picture card__picture--3'>
                            &nbsp;
                          </div>
                          <h4 class='card__heading'>
                            <span class='card__heading-span card__heading-span--3'>
                              COMPUTER SCIENCE
                            </span>
                          </h4>
                          <div class='card__details'>
                            <ul>
                              <Link to='/studentDetail'>
                                {' '}
                                <li> FIRST YEAR</li>{' '}
                              </Link>
                              <li>SECOND YEAR</li>
                              <li>THIRD YEAR</li>
                              <li>FOURTH YEAR</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='column'>
                      <div className='card-detail'>
                        <div class='card__side card__side--front'>
                          <div class='card__picture card__picture--4'>
                            &nbsp;
                          </div>
                          <h4 class='card__heading'>
                            <span class='card__heading-span card__heading-span--4'>
                              COMPUTER SCIENCE
                            </span>
                          </h4>
                          <div class='card__details'>
                            <ul>
                              <Link to='/studentDetail'>
                                {' '}
                                <li> FIRST YEAR</li>{' '}
                              </Link>
                              <li>SECOND YEAR</li>
                              <li>THIRD YEAR</li>
                              <li>FOURTH YEAR</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Tab>
              <Tab eventKey='profile' title='STUDENT DETAILS'>
                <section className='section-tours'>
                  <div className='row'>
                    <div className='column'>
                      <div className='card-detail'>
                        <div class='card__side card__side--front'>
                          <div class='card__picture card__picture--1'>
                            &nbsp;
                          </div>
                          <h4 class='card__heading'>
                            <span class='card__heading-span card__heading-span--1'>
                              COMPUTER SCIENCE
                            </span>
                          </h4>
                          <div class='card__details'>
                            <ul>
                              <Link to='/admin/fourthyear'>
                                {' '}
                                <li>CLICK YEAR TO CONTINUE WITH STUDENT DETAILS </li>{' '}
                              </Link>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='column'>
                      <div className='card-detail'>
                        <div class='card__side card__side--front'>
                          <div class='card__picture card__picture--2'>
                            &nbsp;
                          </div>
                          <h4 class='card__heading'>
                            <span class='card__heading-span card__heading-span--2'>
                            Electrical and Electronics 
                            </span>
                          </h4>
                          <div class='card__details'>
                            <ul>
                            <li>CLICK YEAR TO CONTINUE WITH STUDENT DETAILS </li>{' '}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='column'>
                      <div className='card-detail'>
                        <div class='card__side card__side--front'>
                          <div class='card__picture card__picture--3'>
                            &nbsp;
                          </div>
                          <h4 class='card__heading'>
                            <span class='card__heading-span card__heading-span--3'>
                            Electronics and Communications 
                            </span>
                          </h4>
                          <div class='card__details'>
                            <ul>
                            <li>CLICK YEAR TO CONTINUE WITH STUDENT DETAILS </li>{' '}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='column'>
                      <div className='card-detail'>
                        <div class='card__side card__side--front'>
                          <div class='card__picture card__picture--4'>
                            &nbsp;
                          </div>
                          <h4 class='card__heading'>
                            <span class='card__heading-span card__heading-span--4'>
                             mechanical engineering 
                            </span>
                          </h4>
                          <div class='card__details'>
                            <ul>
                            <li>CLICK YEAR TO CONTINUE WITH STUDENT DETAILS </li>{' '}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Tab>
            </Tabs>
          </div>
        </>
      ) : (
        history.push('/')
      )}
    </div>
  );
};

export default AdminHome;

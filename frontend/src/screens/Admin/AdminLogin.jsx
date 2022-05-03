import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { adminLogin } from '../../redux/action/adminAction';
import { studentLogin } from '../../redux/action/studentAction';
import classnames from 'classnames';
import {
  Tabs,
  Tab,
  Navbar,
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import '../../style/adminLogin.css';

import FormContainer from '../../components/FormContainer';

const AdminLogin = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentRegNum, setStudentRegNum] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isStudentLoading, setIsStudentLoading] = useState(false);
  const [errorsHelper, setErrorsHelper] = useState({});
  const history = useHistory();
  useEffect(() => {
    if (store.admin.isAuthenticated) {
      history.push('/admin');
    }
  }, [history, store.admin.isAuthenticated]);
  useEffect(() => {
    if (store.error) {
      setError(store.error);
    }
  }, [store.error]);

  const fromHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminLogin({ email, password }));
  };

  useEffect(() => {
    if (store.error || store.admin.isAuthenticated) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store.error, store.admin.isAuthenticated]);

  // student
  useEffect(() => {
    if (store.student.isAuthenticated) {
      history.push('/home');
    }
  },[history, store.student.isAuthenticated]);

  useEffect(() => {
    if (store.errorHelper) {
      setErrorsHelper(store.errorHelper);
    }
  }, [store.errorHelper]);

  const studentFormHandler = (e) => {
    e.preventDefault();
    let registrationNumber;
    let password;
    setIsStudentLoading(true);
    dispatch(
      studentLogin({
        registrationNumber: studentRegNum,
        password: studentPassword,
      })
    );
  };

  useEffect(() => {
    if (store.errorHelper || store.student.isAuthenticated) {
      setIsStudentLoading(false);
    } else {
      setIsStudentLoading(false);
    }
  }, [store.errorHelper, store.student.isAuthenticated]);

  return (
    <>
      <main>
        <header>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <Navbar.Brand href='#home'>
                <img
                  alt=''
                  src='https://www.nicepng.com/png/full/944-9441929_anna-university-logo-png.png'
                  width='30'
                  height='30'
                  className='d-inline-block align-top'
                />{' '}
                <h1 className='logo-heading'>
                  University college of engineering kancheepuram
                </h1>
              </Navbar.Brand>
            </Container>
          </Navbar>
        </header>
        <Tabs
          defaultActiveKey='profile'
          id='uncontrolled-tab-example'
          className='mb-3'
        >
          <Tab eventKey='home' title='ADMIN'>
            <div className='container-fluid my-auto'>
              <Card className='login-form'>
                <FormContainer>
                  <img
                    src='https://i.ibb.co/3yXHk6Q/78948.png'
                    alt=''
                    className='admin-image'
                  />
                  <h1>Sign In</h1>

                  <Form onSubmit={fromHandler}>
                    <Form.Group controlId='email'>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Button
                      type='submit'
                      variant='primary'
                      className='btn-margin'
                    >
                      Sign In
                    </Button>
                  </Form>

                  <Row className='py-3'>
                    <Col>
                      New User?{' '}
                      {/* <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link> */}
                    </Col>
                  </Row>
                </FormContainer>
              </Card>
            </div>
          </Tab>
          <Tab eventKey='profile' title='STUDENT'>
            <div className='row'>
              <div
                className='col-md-8 m-auto border'
                style={{
                  backgroundColor: '#e4ebf5',
                  borderRadius: '1.2rem',
                  padding: '1rem 1rem 0rem 1rem',
                  width: '30%',
                }}
              >
                <div>
                  <img
                    src='https://i.ibb.co/SXLxm2X/student.png'
                    alt='student'
                    border='0'
                    className='student-image'
                  />
                  <h2 className='text-center'>STUDENT</h2>
                  <form noValidate onSubmit={studentFormHandler}>
                    <div className='form-group  reg-num'>
                      <label htmlFor='studentId'>Registration Number</label>
                      <input
                        onChange={(e) => setStudentRegNum(e.target.value)}
                        type='text'
                        value={studentRegNum}
                        className={classnames('form-control', {
                          'is-invalid': errorsHelper.registrationNumber,
                        })}
                        id='studentId'
                      />
                      {errorsHelper.registrationNumber && (
                        <div className='invalid-feedback'>
                          {errorsHelper.registrationNumber}
                        </div>
                      )}
                    </div>
                    <div className='form-group  stud-pwd'>
                      <label htmlFor='passwordId'>Password</label>
                      <input
                        onChange={(e) => setStudentPassword(e.target.value)}
                        value={studentPassword}
                        className={classnames('form-control', {
                          'is-invalid': errorsHelper.password,
                        })}
                        type='password'
                        id='passwordId'
                      />
                      {errorsHelper.password && (
                        <div className='invalid-feedback'>
                          {errorsHelper.password}
                        </div>
                      )}
                    </div>
                    <div className=' text-center  stud-btn'>
                      {!isStudentLoading && (
                        <button
                          type='submit'
                          className='btn btn-primary btn-lg '
                        >
                          Login
                        </button>
                      )}
                    </div>
                    <div class='row justify-content-center'>
                      <div class='col-md-1'>
                        {isStudentLoading && (
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
          </Tab>
        </Tabs>
      </main>
    </>
  );
};

export default AdminLogin;

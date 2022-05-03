import React from 'react';
import { useHistory } from 'react-router-dom';
import {  useDispatch } from 'react-redux';

import { adminLogout } from '../redux/action/adminAction';
import { Container, Navbar, Nav } from 'react-bootstrap';


import '../style/header.css';

const Header = () => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(adminLogout());
    history.push('/adminLogin');
  };
  return (
    <header>
      <header>
        <Navbar className='bg-primary' expand='lg'>
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
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse
              id='basic-navbar-nav '
              className='justify-content-end'
            >
              <Nav>
                <Nav.Link
                  href=''
                  onClick={logoutHandler}
                  style={{ color: 'white' }}
                >
                  <i class='fas fa-user' style={{ color: 'white' }}></i> ADMIN
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </header>
  );
};

export default Header;


import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {useSelector} from 'react-redux'

import jwt_decode from 'jwt-decode';
import setAuthToken from './redux/utils/setAuthToken'
import store from './redux/store'

import { setAdminUser, adminLogout } from './redux/action/adminAction'
import { setStudentUser, studentLogout } from './redux/action/studentAction'

import WelcomeScreen from './screens/WelcomeScreen';
import  AdminLogin from './screens/Admin/AdminLogin'


import AdminHome from './screens/Admin/AdminHome'

import FourthYear from './screens/Admin/Student/CSE/FourthYear'

import AdminAddStudent from './screens/Admin/AddStudent';

import AdminAddSubject from './screens/Admin/Student/CSE/AddSubject';

import StudentHome from './screens/Student/StudentHome';

import RecieverUserDetails from './screens/Student/RecieverUserDetails';
import RecieverSubject from './screens/Student/ReciverSubject';

if (window.localStorage.adminJwtToken) {
  setAuthToken(localStorage.adminJwtToken);
  const decoded = jwt_decode(localStorage.adminJwtToken);

  store.dispatch(setAdminUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(adminLogout());
    window.location.href = '/';
  } 
}
else if (window.localStorage.studentJwtToken) {
  setAuthToken(localStorage.studentJwtToken);
  const decoded = jwt_decode(localStorage.studentJwtToken);

  store.dispatch(setStudentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(studentLogout());
    window.location.href = '/';
  } 
}
function App() {
  // eslint-disable-next-line no-unused-vars
  const store = useSelector((store)=>store)
  return (
   <Router>
      <Switch>
              <Route exact path='/' component={WelcomeScreen}/>
              <Route exact path='/adminLogin' component={AdminLogin}/> 
              <Route exact path='/admin' component={AdminHome} />
              <Route exact path='/admin/fourthyear' component={FourthYear} />
              <Route exact path="/admin/addStudent" component={AdminAddStudent} />
              <Route exact path="/admin/addSubject" component={AdminAddSubject} />
              <Route exact path="/home"   component={StudentHome}/>
              <Route exact path="/student/:registrationNumber" component={RecieverUserDetails} />
      </Switch>
    
   </Router>
  );
}

export default App;

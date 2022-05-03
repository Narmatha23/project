
import React from 'react';


import { Link } from 'react-router-dom'

import '../style/bootstrap (1).css'
import '../style/welcome.css'

function App() {
  return (
   <>
      <main className="section">
        <div className = 'header' >
          <div className ='logo-box'>
          <img
              alt=''
              src='https://www.nicepng.com/png/full/944-9441929_anna-university-logo-png.png'
              width='50'
              height='50'
              className='d-inline-block align-top'
            />
          </div>
           <div className = 'text-box'>
             <h1 className ='heading-primary'>
               <span className = 'main'>WELCOME</span>
               <span className = 'sub'>UCEK PAYMENT GATEWAY</span>
             </h1>
             <Link to= '/adminLogin'>
                <button type="button" class="btn btn-primary btn-lg btn-white">CONTINUE TO LOGIN PAGE</button>
              </Link>
           </div>
        </div>
      </main>
   </>
  );
}

export default App;

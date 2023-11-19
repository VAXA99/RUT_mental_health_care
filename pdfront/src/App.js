import './components/login.css';
import './components/home.css';
import './components/forum.css'
import './components/specialists.css'

import Home from './components/Home.js';
import Header from './components/Header.js';
import Sign_up from './components/Sign_up.js';
import { Specialists } from './components/Specialists.js';
import { Forum } from './components/Forum.js';
import Auth from './components/Login.js';

import { Helmet } from 'react-helmet'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";



function App() {
  return (
    <div>
   

      <Router>

        <Routes>

          <Route exact path='/' element={<div className='containerr'><Header/> <Home/></div>}/>

          <Route exact path='/auth' element={ <Auth/>}/>

          <Route exact path='/l' element={ <Home/>}/>

          <Route exact path='/sign_up' element={ <Sign_up/>}/>

          <Route exact path='/forum' element ={<div className='containerr'><Header/><Forum/></div>}/>

          <Route exact path='/spec' element ={<div className='containerr'><Header/><Specialists/></div>}/>

        </Routes>

      </Router>    

    </div>
  );
}

export default App;

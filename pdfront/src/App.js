import './components/Login/login.css';
import './components/Home/home.css';
import './components/Forum/forum.css'
import './components/Specialists/specialists.css'

import Home from './components/Home/Home.js';
import Header from './components/Header/Header.js';
import Sign_up from './components/SignUp/Sign_up.js';
import { Specialists } from './components/Specialists/Specialists.js';
import { Forum } from './components/Forum/Forum.js';
import { Login } from './components/Login/Login.js';

import { Helmet } from 'react-helmet'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Test from "./backend/Test";



function App() {
  return (
    <div>
   

      <Router>

        <Routes>

          <Route exact path='/' element={<div className='containerr'><Header/> <Home/></div>}/>

          <Route exact path='/auth' element={ <Login/>}/>

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

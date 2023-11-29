import './components/Login/login.css';
import './components/Home/home.css';
import './components/Forum/forum.css'
import './components/Specialists/specialists.css'
import "./components/Form/form.css"
import "./components/Articles/articles.css"
import "./components/Calendar/calendar.css"


import Home from './components/Home/Home.js';
import Header from './components/Header/Header.js';
import Sign_up from './components/SignUp/Sign_up.js';
import {Specialists} from './components/Specialists/Specialists.js';
import {Forum} from './components/Forum/Forum.js';
import {Login} from './components/Login/Login.js';
import {ChangePassword} from './components/Change password/ChangePassword.js';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {SendEmail} from './components/Send email/SendEmail.js';
import {Form1} from './components/Form/Form1.js';
import {Form2} from './components/Form/Form2.js';
import Articles from './components/Articles/Articles.js';
import Calendar from './components/Calendar/Calendar.js';
import UserProfile from "./components/UserProfile/UserProfile";


function App() {

    return (
        <div>


            <Router>

                <Routes>

                    <Route exact path='/' element={<Home/>}/>

                    <Route exact path='/auth' element={<Login/>}/>

                    <Route exact path='/l' element={<Home/>}/>

                    <Route exact path='/sign_up' element={<Sign_up/>}/>

                    <Route exact path='/forum' element={<div className='containerr'><Header/><Forum/></div>}/>

                    <Route exact path='/spec' element={<div className='containerr'><Header/><Specialists/></div>}/>

                    <Route exact path='/change_pass' element={<div className='containerr'><ChangePassword/></div>}/>

                    <Route exact path='/send_email' element={<div className='containerr'><SendEmail/></div>}/>

                    <Route exact path='/form1' element={<Form1/>}/>
                    <Route exact path='/form2' element={<Form2/>}/>
                    <Route exact path='/articles' element={<Articles/>}/>
                    <Route exact path='/calendar' element={<Calendar/>}/>
                    <Route exact path='/user_profile/:userId' element={<UserProfile/>}/>

                </Routes>

            </Router>

        </div>
    );
}

export default App;

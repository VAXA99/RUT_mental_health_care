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

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {SendEmail} from './components/Send email/SendEmail.js';
import Articles from './components/Articles/Articles.js';
import Calendar from './components/Calendar/Calendar.js';
import UserProfile from "./components/UserProfile/UserProfile";
import {ConsultationAppointment} from "./components/ConsultationAppointment/ConsultationAppointment";
import {Form3} from "./components/Form/Form3";
import {ForumMain} from "./components/Forum/ForumMain";
import {NewForum} from "./components/Forum/NewForum";


function App() {

    return (
        <div>


            <Router>

                <Routes>

                    <Route exact path='/' element={<Home/>}/>

                    <Route exact path='/auth' element={<Login/>}/>

                    <Route exact path='/sign_up' element={<Sign_up/>}/>

                    <Route exact path='/forum' element={<Forum/>}/>

                    <Route exact path='/spec' element={<Specialists/>}/>

                    <Route exact path='/change_pass' element={<ChangePassword/>}/>

                    <Route exact path='/send_email' element={<SendEmail/>}/>

                    <Route exact path='/consultation_appointment' element={<ConsultationAppointment/>}/>

                    <Route exact path='/articles' element={<Articles/>}/>

                    <Route exact path='/calendar' element={<Calendar/>}/>
                    <Route path='/user_profile/:username' element={<UserProfile/>}/>
                    <Route path='/forum_main' element={<ForumMain/>}/>
                    <Route path='/new_forum' element={<NewForum/>}/>

                </Routes>

            </Router>

        </div>
    );
}

export default App;

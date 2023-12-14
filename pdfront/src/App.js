import './components/Login/login.css';
import './components/Home/home.css';
import './components/Threads/forum.css'
import './components/Specialists/specialists.css'
import "./components/Form/form.css"
import "./components/Articles/articles.css"
import "./components/Calendar/calendar.css"

import Home from './components/Home/Home.js';
import Sign_up from './components/SignUp/Sign_up.js';
import {Specialists} from './components/Specialists/Specialists.js';
import {Comms} from './components/Threads/comms.js';
import {Login} from './components/Login/Login.js';
import {ChangePassword} from './components/Change password/ChangePassword.js';

import {Route, Routes, useNavigate} from "react-router-dom";
import {SendEmail} from './components/Send email/SendEmail.js';
import Articles from './components/Articles/Articles.js';
import Calendar from './components/Calendar/Calendar.js';
import UserProfile from "./components/UserProfile/UserProfile";
import {ConsultationAppointment} from "./components/ConsultationAppointment/ConsultationAppointment";
import {ThreadFeed} from "./components/Threads/ThreadFeed";
import {ThreadCreation} from "./components/Threads/ThreadCreation";
import Header from "./components/Header/Header";
import PsychoForm from "./components/PsychoForm/PsychoForm";

function App() {

    const shouldRenderHeader = () => {
        const currentPath = window.location.pathname;
        return !(currentPath === '/auth' || currentPath === '/sign_up');
    };

    return (
        <div>
            {shouldRenderHeader() && <Header />}

            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/auth' element={<Login/>}/>
                <Route exact path='/sign_up' element={<Sign_up/>}/>
                {/*<Route exact path='/forum' element={<Comms/>}/>*/}
                <Route exact path='/spec' element={<Specialists/>}/>
                <Route exact path='/change_pass' element={<ChangePassword/>}/>
                <Route exact path='/send_email' element={<SendEmail/>}/>
                <Route exact path='/consultation_appointment' element={<ConsultationAppointment/>}/>
                <Route exact path='/articles' element={<Articles/>}/>
                <Route exact path='/calendar' element={<Calendar/>}/>
                <Route exact path='/user_profile/:username' element={<UserProfile/>}/>
                <Route exact path='/feed' element={<ThreadFeed/>}/>
                <Route exact path='/thread_creation' element={<ThreadCreation/>}/>
                <Route exact path='/thread/:thread_title' element={<Comms/>}/>
                <Route path='/psycho_form' element={<PsychoForm/>}/>
            </Routes>

        </div>
    );
}

export default App;

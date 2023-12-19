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
import {ResetPassword} from './components/ResetPassword/ResetPassword.js';

import {Route, Routes} from "react-router-dom";
import {SendEmail} from './components/Send email/SendEmail.js';
import Articles from './components/Articles/Articles.js';
import {CreateArticle} from "./components/Articles/CreateArticle";
import UserProfile from "./components/UserProfile/UserProfile";
import {ConsultationAppointment} from "./components/ConsultationAppointment/ConsultationAppointment";
import {ThreadFeed} from "./components/Threads/ThreadFeed";
import {ThreadCreation} from "./components/Threads/ThreadCreation";
import Header from "./components/Header/Header";
import PsychoSchedule from "./components/PsychoForm/psychoSchedule";
import ProtectedRoute from "./ProtectedRoute";
import {EditArticle} from "./components/Articles/EditArticle";
import ArticleDetails from "./components/Articles/ArticleDetails";
import {EditThread} from "./components/Threads/EditThread";

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
                <Route exact path='/spec' element={<Specialists/>}/>
                <Route path='/articles' element={<Articles/>}/>
                <Route path='/send_email' element={<ProtectedRoute element={<SendEmail />} />} />
                <Route path='/consultation_appointment' element={<ProtectedRoute element={<ConsultationAppointment />} />} />
                <Route path='/user_profile/:username' element={<ProtectedRoute element={<UserProfile />} />} />
                <Route path='/feed' element={<ProtectedRoute element={<ThreadFeed />} />} />
                <Route path='/thread_creation' element={<ProtectedRoute element={<ThreadCreation />} />} />
                <Route path='/thread/:postId' element={<ProtectedRoute element={<Comms />} />} />
                <Route path='/psycho_schedule' element={<ProtectedRoute element={<PsychoSchedule />} />} />
                <Route path='/create_article' element={<ProtectedRoute element={<CreateArticle/>}/>} />
                <Route path='/article/:articleId' element={<ProtectedRoute element={<ArticleDetails/>}/>} />
                <Route path='/edit_article/:articleId' element={<ProtectedRoute element={<EditArticle/>}/>} />
                <Route path='/edit_thread/:threadId' element={<ProtectedRoute element={<EditThread/>}/>} />
            </Routes>

        </div>
    );
}

export default App;

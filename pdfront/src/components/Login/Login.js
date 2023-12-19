import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import auth from "../../backend/Auth";

export const Login = () => {
    // State to manage user input
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // State to manage authentication errors
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        setError('');

        try {
            const token = await auth.signIn(username, password);

            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            setError('Неверный логин или пароль');
        }
    };

    const goBack = () => {
        navigate(-1); // Navigate back one step in the history stack
    };

    useEffect(() => {
        const tokenValid = auth.isTokenValid();
        if (tokenValid) {
            navigate("/")
        }
    }, [navigate]);

    return (
        <div className='body'>
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/forma-djr-banner" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap"
                  rel="stylesheet"></link>
            <img className="angle top left" src="/img/Star%200.png" alt=""/>
            <img className="angle top right" src="/img/Ellipse%205.png" alt="1"/>
            <img className="angle bottom right" src="/img/Star%200.png" alt=""/>
            <img className="angle bottom left" src="/img/Ellipse%205.png" alt="1"/>
            <div className="container auth">
                <Link to={"/"}>
                    <div className="auth__img"><img src="/img/Логотип%20РУТ%20(МИИТ)%20синий%201.png" alt=""/></div>
                    <div className="auth__title">Цифровая система психологической поддержки РУТ</div>
                </Link>
                <form  onSubmit={handleLogin}>
                    <div className="auth__form">
                    <div className="input__block">
                        <input className="auth__input"
                               placeholder="логин"
                               type="text" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <input className="auth__input"
                               placeholder="пароль"
                               type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}/>

                        {error && <div className="auth__error">{error}</div>}
                    </div>
                    </div>
                    <div className="form__buttons">
                        <button type="submit" className="auth__button">
                            Вход
                        </button>
                        <div>
                            <Link to={'/sign_up'} className="auth__link">
                                Региcтрация
                            </Link>
                        </div>
                        <div>
                            <Link to={'/reset_password'} className="auth__link">
                                Забыли пароль?
                            </Link>
                        </div>

                        <div className="auth__link" onClick={goBack}>Назад</div>
                    </div>
                </form>
            </div>
        </div>
    );
}
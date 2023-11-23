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

        // Make a request to your backend /api/auth/signIn endpoint
        const response = await fetch('http://localhost:8080/api/auth/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        // Check if the login was successful
        if (response.ok) {
            // Extract the JWT token from the response
            const token = await response.text();

            // Store the token in localStorage (you might want to use more secure storage)
            localStorage.setItem('token', token);

            navigate("/");
        } else {
            setError("Неверный логин или пароль");
        }
    };

    useEffect(() => {
        const tokenValid = auth.isTokenValid();
        if (tokenValid) {
            navigate("/")
        }
    }, [navigate]);

    //TODO handle bad credentials
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
                <form className="auth__form" onSubmit={handleLogin}>
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

                    <div className="form__buttons">
                        <button type="submit" className="auth__button">
                            Вход
                        </button>
                        <div>
                            <Link to={'/sign_up'} className="auth__link">
                                Региcтрация
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
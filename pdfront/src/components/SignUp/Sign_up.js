import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import auth from '../../backend/Auth'

export default function Sign_up() {
    // State to manage user input
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    // Function to handle user registration
    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const isValidUsername = await auth.isUsernameValid(username);
        const isValidEmail = await auth.isEmailValid(email);

        setUsernameError('');
        setEmailError('');


        if (!isValidUsername) {
            setUsernameError("Данный логин уже занят")
        }

        if (!isValidEmail) {
            setEmailError('Аккаунт с такой почтой уже сущетсвует');
        }

        // Check if either username or email is invalid
        if (!isValidUsername || !isValidEmail) {
            return;
        }

        // Make a request to your backend /api/auth/signUp endpoint
        if (await auth.signUp(email, username, password, name, surname)) {
            navigate("/");
        }
    };

    useEffect(() => {
        const tokenValid = auth.isTokenValid();
        if (tokenValid) {
            navigate("/auth")
        }
    }, [navigate]);

    //TODO handle email/username occupation
    return (
        <div className='body'>
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
                    <Link to={"/"} >
                        <div className="auth__img"><img src="/img/Логотип%20РУТ%20(МИИТ)%20синий%201.png" alt=""/></div>
                        <div className="auth__title">Цифровая система психологической поддержки РУТ</div>
                    </Link>

                    <form className="auth__form" onSubmit={handleSignUp}>
                        <div className="input__block">
                            <input
                                className="auth__input"
                                placeholder="почта"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="auth__input"
                                placeholder="логин"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                className="auth__input"
                                placeholder="пароль"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                className="auth__input"
                                placeholder="имя"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className="auth__input"
                                placeholder="фамилия"
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>
                        {usernameError && <div className="auth__error">{usernameError}</div>}
                        {emailError && <div className="auth__error">{emailError}</div>}
                        <div className="form__buttons">
                            <button type="submit" className="auth__button">
                                Регистрация
                            </button>
                            <div>
                                <Link className="auth__link" to={'/auth'}>
                                    Вход
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
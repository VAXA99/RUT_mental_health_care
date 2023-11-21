import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Sign_up() {
    // State to manage user input
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    // Function to handle user registration
    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Make a request to your backend /api/auth/signUp endpoint
        const response = await fetch('http://localhost:8080/api/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                username,
                password,
                name,
                surname,
            }),
        });

        // Check if the registration was successful
        if (response.ok) {
            // Optionally, you can redirect the user to the login page or perform other actions
            console.log('Registration successful');
        } else {
            // Handle registration error, e.g., show an error message to the user
            console.log('Registration failed');
        }
    };

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
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, error } = useSelector((state) => state.user);

    const handleLogin = async () => { //Fonction permettant de gérer le processus de connexion
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password: password }),
            });

            const data = await response.json();

            // Vérifie réponse API, si ok : token + username, sinon erreur
            if (response.ok) {
                dispatch(login({ token: data.body.token, name: username }));
            } else {
                console.error('Login failed:', data);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/user');
        }
    }, [isAuthenticated, navigate]); // Si connecté, redirigé vers userpage

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="button" className="sign-in-button" onClick={handleLogin}>
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
};

export default SignIn;
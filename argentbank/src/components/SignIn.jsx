import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // État pour gérer les erreurs
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);

    const handleLogin = async () => { // Fonction permettant de gérer le processus de connexion
        setErrorMessage(''); // Réinitialiser le message d'erreur avant chaque tentative
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password: password }),
            });

            const data = await response.json();

            // Vérifie la réponse de l'API, si ok : token + username, sinon erreur
            if (response.ok) {
                dispatch(login({ token: data.body.token, name: username }));
            } else {
                // Gestion des erreurs : mauvaise réponse du backend
                setErrorMessage(data.message || 'Invalid username or password'); // Affiche le message d'erreur
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('An error occurred. Please try again.'); // Erreur réseau ou autre
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
                    {/* Affichage du message d'erreur si errorMessage n'est pas vide */}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button type="button" className="sign-in-button" onClick={handleLogin}>
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
};

export default SignIn;
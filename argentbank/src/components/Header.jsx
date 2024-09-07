import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchUserProfile } from '../redux/userSlice';
import argentBankLogo from '../img/argentBankLogo.webp';


const Header = () => {
    const user = useSelector((state) => state.user); // Permet d'accéder à l'état user dans Redux, info sur l'utilisateur actuellement connecté
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isAuthenticated && user.token) {
            dispatch(fetchUserProfile(user.token));
        }
    }, [dispatch, user.isAuthenticated, user.token]); // Si l'utilisateur est authentifié ou a un token, exécute l'action fetch

    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); // Redirige vers la page d'accueil après déconnexion
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {/* Si l'utilisateur est authentifié, lien vers la page user + sign out */}
                {user.isAuthenticated ? ( 
                    <>
                        <Link className="main-nav-item" to="/user">
                            <i className="fa fa-user-circle"></i>
                            {user.name}
                        </Link>
                        <button className="main-nav-item" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
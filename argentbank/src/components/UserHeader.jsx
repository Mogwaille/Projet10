import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import argentBankLogo from '../img/argentBankLogo.webp';


const UserHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Récupérer le nom d'utilisateur depuis le store Redux
    const userName = useSelector((state) => state.user.userName);

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
                <Link className="main-nav-item" to="/user">
                    <i className="fa fa-user-circle"></i>
                    {userName}
                </Link>
                <button className="sign-out-button" onClick={handleLogout}>
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </button>
            </div>
        </nav>
    );
};

export default UserHeader;
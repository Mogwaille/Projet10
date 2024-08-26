import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../redux/userSlice'; 
import UserAccount from './UserAccount';
import Footer from './Footer';
import EditUsernameForm from './EditUsernameForm';


const User = () => {
    const [isEditing, setIsEditing] = useState(false); // Permet de savoir si le formulaire d'édition doit s'afficher ou non
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Permet de récupérer le profil utilisateur depuis l'API
    useEffect(() => {
        if (!user.userName && localStorage.getItem('userName')) {
            dispatch(fetchUserProfile({ userName: localStorage.getItem('userName') }));
        }
    }, [dispatch, user.userName]);

    // Déclenche l'affichage du formulaire d'édition
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Permet de refermer le formulaire d'édition
    const handleClose = () => {
        setIsEditing(false);
    };

    return (
        <>
            <main className="main bg-dark">
                <div className="header">
                <h1>{isEditing ? "Edit user info" : `Welcome back ${user.userName || "No username defined"}!`}</h1> {/* Affiche le pseudo, sauf s'il n'est pas défini. Si editing, alors texte change */}
                    {/* Affiche le formulaire, sinon affiche le bouton edit name */}
                    {isEditing ? ( 
                        <EditUsernameForm
                            currentUsername={user.userName}
                            onClose={handleClose}
                        />
                    ) : (
                        <button className="edit-button" onClick={handleEditClick}>
                            Edit Name
                        </button>
                    )}
                </div>
                <section className="user-accounts">
                    <UserAccount title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
                    <UserAccount title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
                    <UserAccount title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default User;
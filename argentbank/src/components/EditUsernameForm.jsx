import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Ajout de useSelector pour accéder à l'état global
import { updateUserProfile } from '../redux/userSlice';

const EditUsernameForm = ({ currentUsername, onClose }) => {
    // Récupération du firstName et lastName depuis le store Redux
    const { firstName, lastName } = useSelector((state) => state.user);
    
    const [newUsername, setNewUsername] = useState(currentUsername);
    const dispatch = useDispatch(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile({ userName: newUsername })); // Envoie le nouveau pseudo puis met à jour le profil
        onClose(); // Ferme le formulaire après l'enregistrement
    };

    return (
        <form className="edit-user-info-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">User name:</label>
                <input
                    type="text"
                    id="username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)} // Mise à jour à chaque modification du champ
                    className="edit-username-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="firstName">First name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName} // Utilise le firstName depuis l'état global
                    disabled
                    className="edit-username-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName} // Utilise le lastName depuis l'état global
                    disabled
                    className="edit-username-input"
                />
            </div>
            <div className="form-buttons">
                <button type="submit" className="edit-username-button">Save</button>
                <button type="button" onClick={onClose} className="edit-username-cancel-button">Cancel</button>
            </div>
        </form>
    );
};

export default EditUsernameForm;
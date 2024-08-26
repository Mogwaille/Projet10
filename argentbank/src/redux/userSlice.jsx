import { createSlice } from '@reduxjs/toolkit';

// Charger l'état initial depuis le localStorage
const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  name: localStorage.getItem('name') || '',
  userName: localStorage.getItem('userName') || '',
  firstName: localStorage.getItem('firstName') || '', // Ajout de firstName dans l'état initial
  lastName: localStorage.getItem('lastName') || '', // Ajout de lastName dans l'état initial
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName; // Ajout de firstName lors de la connexion
      state.lastName = action.payload.lastName; // Ajout de lastName lors de la connexion

      // Sauvegarder les informations dans le localStorage
      localStorage.setItem('token', state.token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('name', state.name);
      localStorage.setItem('userName', state.userName);
      localStorage.setItem('firstName', state.firstName); // Sauvegarde de firstName dans le localStorage
      localStorage.setItem('lastName', state.lastName); // Sauvegarde de lastName dans le localStorage
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.name = '';
      state.userName = '';
      state.firstName = ''; // Réinitialiser firstName lors de la déconnexion
      state.lastName = ''; // Réinitialiser lastName lors de la déconnexion

      // Supprimer les informations du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('name');
      localStorage.removeItem('userName');
      localStorage.removeItem('firstName'); // Supprimer firstName du localStorage
      localStorage.removeItem('lastName'); // Supprimer lastName du localStorage
    },
    // Met à jour le nom, le pseudo, le prénom et le nom de famille
    setUserProfile: (state, action) => {
      state.name = action.payload.name;
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName; // Mise à jour de firstName
      state.lastName = action.payload.lastName; // Mise à jour de lastName

      // Met à jour le nom, le pseudo, le prénom et le nom de famille dans le localStorage
      localStorage.setItem('name', state.name);
      localStorage.setItem('userName', state.userName);
      localStorage.setItem('firstName', state.firstName); // Sauvegarde de firstName dans le localStorage
      localStorage.setItem('lastName', state.lastName); // Sauvegarde de lastName dans le localStorage
    },
  },
});

export const { login, logout, setUserProfile } = userSlice.actions;

// Fonction qui récupère le profil utilisateur depuis l'API en utilisant le token
export const fetchUserProfile = () => async (dispatch, getState) => {
  const { token } = getState().user;
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    // Si ok, met à jour l'état avec le pseudo, le prénom et le nom de famille, sinon erreur
    if (response.ok) {
      const { userName, firstName, lastName } = data.body;
      dispatch(setUserProfile({ userName, firstName, lastName }));
    } else {
      console.error('Failed to fetch user profile', data);
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};

// Fonction qui envoie une requête PUT pour mettre à jour le profil utilisateur
export const updateUserProfile = (data) => async (dispatch, getState) => {
  const { token } = getState().user;
  try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
      });
      const result = await response.json();
      dispatch(fetchUserProfile(result.body)); // Met à jour le profil après la modification
  } catch (error) {
      console.error('Failed to update user profile:', error);
  }
};

export default userSlice.reducer;
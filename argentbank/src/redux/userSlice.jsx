import { createSlice } from '@reduxjs/toolkit';

// Charger l'état initial depuis le localStorage
const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  userName: localStorage.getItem('userName') || '',
  firstName: localStorage.getItem('firstName') || '',
  lastName: localStorage.getItem('lastName') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;

      // Sauvegarder les informations dans le localStorage
      localStorage.setItem('token', state.token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', state.userName);
      localStorage.setItem('firstName', state.firstName);
      localStorage.setItem('lastName', state.lastName);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userName = '';
      state.firstName = '';
      state.lastName = '';

      // Supprimer les informations du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userName');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
    },
    // Met à jour le pseudo, le prénom et le nom de famille
    setUserProfile: (state, action) => {
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;

      // Met à jour le pseudo, le prénom et le nom de famille dans le localStorage
      localStorage.setItem('userName', state.userName);
      localStorage.setItem('firstName', state.firstName);
      localStorage.setItem('lastName', state.lastName);
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
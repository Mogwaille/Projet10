import { configureStore } from '@reduxjs/toolkit'; // Fonction qui simplifie la création d'un store Redux
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;
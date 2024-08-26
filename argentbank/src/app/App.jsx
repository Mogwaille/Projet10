import React from 'react';
import { useSelector } from 'react-redux'; // Permet d'accéder au state du store Redux
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import Main from '../components/Main';
import SignIn from '../components/SignIn';
import User from '../components/User';

import '../css/main.css';


const App = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Permet de savoir si l'utilisateur est authentifié ou non
  
    return (
      <Router>
        {isAuthenticated ? <UserHeader /> : <Header />} {/* Affiche le UserHeader si authentifié, sinon le Header classique */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user" element={<User />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
    );
  };
  
  export default App;
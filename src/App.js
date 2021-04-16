import React from 'react';
import Router from './Router';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from './Context/AuthContext';
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router></Router>
    </AuthContextProvider>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Router, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/:username" element={<UserPage />}/>
        <Route path="/" element={<MainPage />} />
        <Route path="/user/:username/profile" element={<ProfilePage />} />
        <Route path="/user/:username/changePassword" element={<ChangePasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

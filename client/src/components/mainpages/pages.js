import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './homepage/home'; // Import your Home component
//import About from './About';
import Profile from './results/Profile.js'; // Import your Profile component
import LoginPage from './userlogin/login.js';
import Signup from './userlogin/signup.js';
import { DataProvider } from '../../GlobalState.js';
import UpdateProfile from './forms/updateProfile.js';
import JobList from './results/Jobs.js';
import JobForm from './forms/HireForm.js';
import JobApplicationForm from './forms/Apply.js';


const Pages = () => {
  return (
    <DataProvider>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<Signup/>}/>
   <Route path="/Profile" element={<Profile/>}/>
   <Route path="/updateProfile" element={<UpdateProfile/>}/>
   <Route path="/jobs" element={<JobList/>} />
   {/* <Route path="/jobs/:category" element={<JobList/>} /> */}
   <Route path="/hire" element={<JobForm/>}/>
   <Route path="/apply/:jobId" element={<JobApplicationForm/>} />
  
    
   
    </Routes>
    </DataProvider>
  );
};

export default Pages;

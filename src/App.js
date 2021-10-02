import React from 'react'
import ContactUs from './components/contact-us/ContactUs'
import HisWork from './components/forms/HisWork'
import Review from './components/forms/Review'
import Tools from './components/forms/Tools'
import Services from './components/services/Services'
// import {
//     BrowserRouter ,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";
import SignIn from './components/Sign/SignIn'
import SignUp from './components/Sign/SignUp'
import Test from './components/test'
import AboutUs from './components/about-us/AboutUs'
import ClientProfile from './components/profiles/ClientProfile'
import ViewProfile from './components/profiles/ViewProfile'
import WorkerProfile from './components/profiles/WorkerProfile'

function App() {
    return (
        <>
        <SignUp/>
        <SignIn/>
        <Test/>
        <HisWork/>
        <Services/>
        <ClientProfile/>
        <ViewProfile/>
        <WorkerProfile/>

            
        </>
    )
}

export default App

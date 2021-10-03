import React from 'react'
import ContactUs from './components/contact-us/ContactUs'
import HisWork from './components/forms/HisWork'
import Review from './components/forms/ReviewForm'
import Tools from './components/forms/ToolsForm'
import Ibrahem from './components/ibrahem'
import Services from './components/services/Services'
import ViewProfile from './components/profiles/ViewProfile'
// import {
//     BrowserRouter ,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";
import SignIn from './components/Sign/SignIn'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import WorkerProfile from './components/profiles/WorkerProfile'
import ClientProfile from './components/CleintProfile'
function App() {
    return (
        <>
        <Header/>
        
        {/* <Home/> */}
            {/* 
            <div>
                <p>kkkkkkkkk</p>
                <SignUp/>
            </div>
            

            <HisWork/>
            <Review/>
            <Tools/>
            
            <Test/> */}
            <SignIn/>
            <Services/>
            <ViewProfile/>
            {/* <WorkerProfile/> */}
            <Ibrahem/>
            <ClientProfile/>
            <Footer/>
            {/* <ContactUs/> */}
            
        </>
    )
}

export default App

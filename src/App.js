import React from 'react'
import ContactUs from './components/contact-us/ContactUs'
import HisWork from './components/forms/HisWork'
import Review from './components/forms/ReviewForm'
import Tools from './components/forms/ToolsForm'
import Ibrahem from './components/ibrahem'
import Services from './components/services/Services'
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
import AboutUs from "./components/about-us/AboutUs"
import ViewWorkerProfile from './components/ViewWorkerProfile'
import Testchat from './components/chats/Testchat'
import Resever from './components/chats/Resever'
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
            {/* <h1>sss</h1> */}
            <SignIn/>
            <Services/>
            {/* <TestGal/> */}
            {/* <ViewProfile/> */}
            {/* <WorkerProfile/> */}
            {/* <Ibrahem/> */}
            {/* <ClientProfile/> */}
            {/* <ViewWorkerProfile/> */}
            {/* <AdminProfile/> */}
            {/* <Resever/> */}
            {/* <Testchat/> */}
            <ViewWorkerProfile/>
            <Footer/>
            {/* <ContactUs/> */}
            {/* <AboutUs/> */}
        </>
    )
}

export default App

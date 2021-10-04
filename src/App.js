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
import ViewProfile from './components/profiles/ViewProfile'
import ClientP from './components/profiles/ClientP'
import WorkerProfile from './components/profiles/WorkerProfile'
import AdminProfile from './components/profiles/AdminP'
import Chats from './components/chats/Chats'
import Resever from './components/chats/Resever'
function App() {
    return (
        <>
            <SignIn/>
            <div>
                <p>kkkkkkkkk</p>
                <SignUp/>
            </div>
            {/* <ContactUs/> */}
            {/* <AboutUs/> */}

            {/* <HisWork/>
            <Review/>
            <Tools/> */}
            <Services/>
            {/* <Test/> */}
            {/* <Test/> */}
            <ViewProfile/>
            <ClientP/>
            {/* <WorkerProfile/> */}
            <hr/>
            <hr/>
            <hr/>
            <hr/>
            {/* <AdminProfile/> */}
            <Chats/>
            {/* <Resever/> */}
        </>
    )
}

export default App

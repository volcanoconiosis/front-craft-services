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
import ViewProfile from './components/profiles/ViewProfile'
import ClientP from './components/profiles/ClientP'
function App() {
    return (
        <>
            <SignIn/>
            <div>
                <p>kkkkkkkkk</p>
                <SignUp/>
            </div>
            <ContactUs/>

            <HisWork/>
            <Review/>
            <Tools/>
            <Services/>
            <Test/>
            <ViewProfile/>
            <hr/>
            <hr/>
            <hr/>
            <hr/>
            <ClientP/>
        </>
    )
}

export default App

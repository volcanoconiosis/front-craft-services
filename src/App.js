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
function App() {
    return (
        <>
            {/* <SignIn/>
            <div>
                <p>kkkkkkkkk</p>
                <SignUp/>
            </div>
            <ContactUs/> */}
            <AboutUs/>

            {/* <HisWork/>
            <Review/>
            <Tools/>
            <Services/>
            <Test/> */}
        </>
    )
}

export default App

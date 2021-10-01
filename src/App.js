import React from 'react'
import ContactUs from './components/contact-us/ContactUs'
import HisWork from './components/forms/HisWork'
import Review from './components/forms/Review'
import Tools from './components/forms/Tools'
// import {
//     BrowserRouter ,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";
import SignIn from './components/Sign/SignIn'
import SignUp from './components/Sign/SignUp'
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
        </>
    )
}

export default App

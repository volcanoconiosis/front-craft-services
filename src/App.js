import React from 'react'
import ContactUs from './components/contact-us/ContactUs'
import HisWork from './components/forms/HisWork'
import Review from './components/forms/Review'
import Tools from './components/forms/Tools'
import Ibrahem from './components/ibrahem'
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
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
function App() {
    return (
        <>
        <Header/>
        {/* <Home/> */}
            {/* <SignIn/>
            <div>
                <p>kkkkkkkkk</p>
                <SignUp/>
            </div>
            <ContactUs/>

            <HisWork/>
            <Review/>
            <Tools/>
            <Services/>
            <Test/> */}
            <Ibrahem/>
            <Footer/>
        </>
    )
}

export default App

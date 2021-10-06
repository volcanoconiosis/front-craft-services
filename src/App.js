import React, { useContext } from "react";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import SignIn from "./components/Sign/SignIn";
import ProfileProvider from "./context/ProfileContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Services from "./components/services/Services";
import WorkerProfile from "./components/profiles/worker/WorkerPage"; 
import AdminProfile from "./components/profiles/admin/AdminProfile";
import ClientProfile from "./components/profiles/client/CleintProfile";
import AboutUs from "./components/about-us/AboutUs";
import ViewWorkerProfile from "./components/ViewWorkerProfile"
import cookie from "react-cookies"
import { ProfileContext } from "./context/ProfileContext";
function App() {
  const token=cookie.load("token")
  const role=cookie.load("user")
  const context=useContext(ProfileContext)
  return (
    <>
      <ProfileProvider>
        <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/services">
              <Services />
            </Route>
            <Route path="/aboutus">
              <AboutUs/>
            </Route>
            <Route path="/sign">
              <SignIn />
            </Route>
            {token?(<Route path="/profile">
            {role==="worker"?<WorkerProfile />:""}
            {role==="user"?<ClientProfile/>:""}
            {role==="admin"?<AdminProfile/>:""}
              
              
              
            </Route>):("you need to have an account ")}
            
            {/* the view profile handled in the same component */}
            <Route path="/viewprofile"> 
              <ViewWorkerProfile/>
            </Route>
          </Switch>
        <Footer />
        </BrowserRouter>


      </ProfileProvider>
    </>
  );
}

export default App;

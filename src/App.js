import React from "react";

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
function App() {
  return (
    <>
      <ProfileProvider>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/sign">
              <SignIn />
            </Route>
            <Route path="/services">
              <Services />
            </Route>
            <Route path="/profile">
              <WorkerProfile />
              <AdminProfile/>
              <ClientProfile/>
            </Route>
            <Route path="/aboutus">
              <AboutUs/>
            </Route>
            <Route path="/viewprofile">
              <ViewWorkerProfile/>
            </Route>
          </Switch>
        </BrowserRouter>

        <Footer />
      </ProfileProvider>
    </>
  );
}

export default App;

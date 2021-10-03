import React, { useState, useEffect } from "react";
import superagent from "superagent";
import base64 from "base-64";
import cookie from "react-cookies";
import jwt from "jsonwebtoken";

export const LoginContext = React.createContext();
const API = "https://craft-service.herokuapp.com"

export default function LoginProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [list, setList]=useState({});
  const [list2, setList2]=useState({});

  const login = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set(
          "authorization",
          `Basic ${base64.encode(`${username}:${password}`)}`
        );
      console.log(response.body);
      cookie.save("user", response.body.user.role);
   
      validateMyToken(response.body.token);
    } catch (err) {
      console.log(err);
    }
  };
  const signUp = async (items) => {
    try {
      let obj = {
        username:items.username,
        password: items.password,
        role: items.role,
        location:items.location,
        email:items.email,
        phone:items.phone,
        firstName:items.firstName,
        lastName:items.lastName,
        store:"",
        workType:items.workType

      };
      const response = await superagent.post(`${API}/signup`, obj);
      console.log(response.body);
      validateMyToken(response.body.token);
    } catch (err) {
      console.log(err);
    }
  };

  // initial render
  useEffect(() => {
    const myTokenCookie = cookie.load("token"); // read the cookie from browser
    console.log("myTokenCookie: ", myTokenCookie);
    console.log("initial render here !!");
    validateMyToken(myTokenCookie);
  }, []);

  function validateMyToken(token) {
    if (token) {
      const user = jwt.decode(token); // get user object and info
      // NOTE: adding it hardcoded because our API doesnt have it

      setLoginState(true, user);
      cookie.save("token", token);
      // add the token as a cookie in your API response , add time expiry
    } else {
      setLoginState(false, {});
    }
  }

  const setLoginState = (isLoggedIn, user) => {
    setLoggedIn(isLoggedIn);
    setUser(user);
  };

  const logout = () => {
    setLoggedIn(false);
    setUser({});
    cookie.remove("token");
  };
 

  const state = {
    loggedIn: loggedIn,
    login: login,
    logout: logout,
    user: user,
    signUp: signUp,
    setList:setList,
    setList2:setList2,
    list2:list2,
    list:list
  };

  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
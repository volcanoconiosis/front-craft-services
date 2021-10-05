import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "./Auth";
import axios from "axios";
import cookie from "react-cookies";
export const ProfileContext = React.createContext();

function ProfileProvider(props) {
  const role = cookie.load("user");
  const context = useContext(LoginContext);
  const [userData, setUserData] = useState({});
  const token = cookie.load("token");
  const Api = "https://craft-service.herokuapp.com";

  useEffect(async () => {
    if (role === "worker") {
      await axios
        .get(`${Api}/worker`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserData(res.data[0]);
          console.log("setUserData=====>", res.data[0]);
        });
    } else if (role === "user") {
      await axios
        .get(`${Api}/clientData`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserData(res.data[0]);
          console.log("setUserData=====>", res.data[0]);
        });
    }
  },[]);
  let state = {
    list: context.list,
    userData:userData
  };

  console.log("from new context", state.userData);
  return (
    <>
      <ProfileContext.Provider value={state}>
        {props.children}
      </ProfileContext.Provider>
    </>
  );
}

export default ProfileProvider;

import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "./Auth";
import axios from "axios";
import cookie from "react-cookies";
export const ProfileContext = React.createContext();

function ProfileProvider(props) {
  const role = cookie.load("user");
  const context = useContext(LoginContext);
  const [userData, setUserData] = useState({});
  const [list2, setList2] = useState({});
  const [list3, setList3] = useState([]);

  const token = cookie.load("token");
  const Api = "https://craft-service.herokuapp.com";
useEffect(async()=>{

  await axios.get(`${Api}/getAllWorkers`).then((res) => {
    setList2(res.data);
    
  });

  await axios.get(`${Api}/getWorkersData`).then((res) => {
    setList3(res.data);
    
  });
  
},[])
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
    userData:userData,
    list2:list2,
    list3:list3,
    setUserData:setUserData
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

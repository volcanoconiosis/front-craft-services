import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";

function PersonalInfo() {
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const [bio, setBio] = useState("");
  const token = cookie.load("token");
  const Api = process.env.REACT_APP_URL;

  useEffect(async () => {
    // get information personal
    await axios
      .get(`${Api}/getCurrentUser`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserList(res.data);
        console.log(res.data);
      });

    // get worker
    await axios
      .get(`${Api}/worker`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWorkerList(res.data[0]);
        console.log("setWorkerList=====>", res.data[0]);
      });
  }, []);

  // :::::::::: handleBio

  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleBioSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    let reqBody = {
      bio: bio,
    };
    let res = await axios.put(`${Api}/worker/updateany`, reqBody, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log("res after change bio", res);
    setWorkerList(res.data);
  };

  return (
    <div>
      {/*  :::::: render personal information ::::: */}.
      <h1>:::::: render personal information :::::</h1>
      <p> username: {userList.username}</p>
      <p> id: {userList.id}</p>
      <p>bio: {workerList.bio} </p>
      <form onSubmit={handleBioSubmit}>
        <textarea onChange={handleBio}>{workerList.bio}</textarea>
        <button type="submit">confirm</button>
      </form>
      {workerList.profilePicture &&
      workerList.profilePicture.includes("upload") ? (
        <img src={`${Api}/${workerList.profilePicture}`} alt={workerList.id} />
      ) : (
        <img src={workerList.profilePicture} alt={workerList.id} />
      )}
      <h1>:::::: End render personal information :::::</h1>
    </div>
  );
}

export default PersonalInfo;

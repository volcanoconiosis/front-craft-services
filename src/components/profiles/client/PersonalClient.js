import { useEffect, useState} from "react";
import axios from "axios";
import cookie from "react-cookies";

function PersonalClient() {
    const [userList, setUserList] = useState({});
    const [userModelList, setUserModelList] = useState({});
    const token = cookie.load("token");
    const Api = "https://craft-service.herokuapp.com"
    let [values, setValues] = useState({});

    useEffect(async () => {
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
      }, []);
      useEffect(async () => {
        await axios
          .get(`${Api}/clientData`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setUserModelList(res.data[0]);
            console.log("setUserModelList=====>", res.data[0]);
          });
      }, []);

      // delete account
  const handleDeleteAccount = async () => {
    let res = await axios.delete(`${Api}/deleteaccount`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  };
  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log("from sign client:", values);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    const reqBody = {
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: userList.role,
      workType: userList.workType,
      phone: values.phone,
      store: userList.store,
      location: values.location,
      id: userList.id,
    };
    await axios
      .put(`${Api}/updateaccount`, reqBody, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
    return (
        <div>
            {/*  :::::: render personal information ::::: */}
      <h1>:::::: render personal information :::::</h1>
      <p>{userList.username}</p>
      <p>{userList.id}</p>

      {userModelList.profilePicture &&
      userModelList.profilePicture.includes("upload") ? (
        <img
          src={`${Api}/${userModelList.profilePicture}`}
          alt={userModelList.id}
        />
      ) : (
        <img src={userModelList.profilePicture} alt={userModelList.id} />
      )}

<h1>::::::End render personal information :::::</h1>
            
<h1>:::::: delete account 🟢:::::</h1>
      <p>from client</p>
      <button onClick={handleDeleteAccount}>delete account</button>

            {/* form for update account  */}
      <h1>:::::: update  account 🟢:::::</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          defaultValue={userList.username}
        />
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          defaultValue={userList.firstName}
        />
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          defaultValue={userList.lastName}
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          defaultValue={userList.password}
        />
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          defaultValue={userList.phone}
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          defaultValue={userList.email}
        />
        <input
          type="text"
          name="location"
          onChange={handleChange}
          defaultValue={userList.location}
        />

        <button type="submit"> update</button>
      </form>
      <h1>::::::end update  account 🟢:::::</h1>
        </div>
    )
}

export default PersonalClient

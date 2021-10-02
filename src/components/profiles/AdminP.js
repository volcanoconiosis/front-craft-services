import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

function AdminProfile() {
  const [userList, setUserList] = useState({});
  const [adminList, setAdminList] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const token = cookie.load("token");
  const Api = "https://craft-service.herokuapp.com";

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

    // get admin
    await axios
      .get(`${Api}/adminData`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAdminList(res.data[0]);
        console.log("setAdminList=====>", res);
      });
    
  }, []);

  useEffect(()=>{
// get users form admin
 axios
.get(`${Api}/users`, {
  headers: {
    authorization: `Bearer ${token}`,
  },
})
.then(async(res) => {
 await setAllUsers(res.data)
});
  },[])
 
 
  // :::::::::: delete account ::::::::::
  const handleDeleteAccount = async () => {
    let res = await axios.delete(`${Api}/deleteaccount`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  };


  // ::::::::: update admin account ::::::: 😝
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


  // ::::::: handleDeleteUser:::::: 
  const handleDeleteUser =async(id)=>{
    // /deleteuser/:id

    let res = await axios.delete(`${Api}/deleteuser/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setAllUsers(res.data);
  }

  /*

    
    
    :::functions::: 
    - useEffect async 
      - get data endPoint( get,"/adminData")information model about admin
      - get data endPoint( get,"/getCurrentUser")personal info about admin
      - get all users endPoint( get,"/users") ===> delete user (delete, "/deleteuser/:id")
      - get dataWorker && dataUsers ("/clients"  ,, "/getWorkers") 
      - get ("/getAllWorkers") personal information ... workType
      
    - delete account ("/deleteaccount")
    - updat account ("/updateaccount")
    - handle the role for admin to open this page
    
    ::: information ::: display :::
    - users 
    - feed back 
    - chart 😭


    ::: links :::   dont forget Routes to transform between pages

    */
  return (
    <div>
      <button onClick={handleDeleteAccount}>delete account</button>

      {/* form for update account  */}
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

      {/*  :::::: render personal information ::::: */}
      <p>{userList.username}</p>
      <p>{userList.id}</p>

      {adminList.profilePicture &&
      adminList.profilePicture.includes("upload") ? (
        <img
          src={`${Api}/${adminList.profilePicture}`}
          alt={adminList.id}
        />
      ) : (
        <img src={adminList.profilePicture} alt={adminList.id} />
      )}

      {/* render the feedbak (contuct us) */}
      <div>
        <p>{adminList.name}</p>
        <p>{adminList.message}</p>
        <p>{adminList.date}</p>
        <p>{adminList.rate}</p>

      </div>
      <hr />
        {/* render all users  */}
      <div>
      {allUsers.length>0&&
      allUsers.map((item,indx)=>{
        return item.role==="user"? (
          <>
          <p>{item.username}</p>
          <p>{item.firstName}</p>
          <p>{item.lastName}</p>
          <p>{item.role}</p>
          <p>{item.id}</p>
          <p>{item.email}</p>
          <p>{item.location}</p>
          <button onClick={()=>{handleDeleteUser(item.id)}}>delete user </button>
          
          </>
        ):""
        
      })}
      </div>


      <div>
        <hr/>
        <hr/>
      {allUsers.length>0&&
      allUsers.map((item,indx)=>{
        return item.role==="worker"? (
          <>
          <p>{item.username}</p>
          <p>{item.firstName}</p>
          <p>{item.lastName}</p>
          <p>{item.role}</p>
          <p>{item.id}</p>
          <p>{item.email}</p>
          <p>{item.location}</p>
          <button onClick={()=>{handleDeleteUser(item.id)}}>delete user </button>
          
          </>
        ):""

      })}
      </div>
    </div>
  );
}

export default AdminProfile;

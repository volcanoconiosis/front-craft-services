import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { LoginContext } from "../../context/Auth";

function ClientProfile() {
  const [userList, setUserList] = useState({});
  const [userModelList, setUserModelList] = useState({});
  const context = useContext(LoginContext);

  const token = cookie.load("token");
  const Api = process.env.REACT_APP_URL;
 
  
  let [values, setValues] = useState({});
  /*
    :::functions::: 
    - useEffect async 
      - get data endPoint( get,"/getCurrentUser")information personal about client
      - get data endPoint( get,"/clientData")information model about client
      
     
    - post ,, delete ("/client/... "arrays in model)
    - delete account ("/deleteaccount")
    - updat account ("/updateaccount")
    - handle the role for user to open this page
    
    ::: information ::: display :::
    - favWorker  https://craft-service.herokuapp.com/client/favWorker post/delete
       - obj { 
          id:id,
          firstname:firstname,
          lastname:lastname,
          profilePicture:profilePicture,
          workType:workType,
          loction:loction

        


      }
    - favImg   https://craft-service.herokuapp.com/client/favoriteImg post /delete
       - obj {
          img:img,
          description:description
            }
    - recintly   https://craft-service.herokuapp.com/client/recently  post /delete
       - obj { 
          id:id,
          firstname:firstname,
          lastname:lastname,
          profilePicture:profilePicture,
          workType:workType,
          loction:loction
      }
    - chat 

    ::: links :::   dont forget Routes to transform between pages
    */
  // get data
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
  // delete Recently
  const deleteRecently = async (indx) => {
    let res = await axios.delete(`${Api}/client/recently?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setUserModelList(res.data);
  };

  // delete favImg
  const deleteFavImg = async (indx) => {
    let res = await axios.delete(`${Api}/client/favoriteImg?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setUserModelList(res.data);
  };
  // delete favWorker
  const deleteFavWorker = async (indx) => {
    let res = await axios.delete(`${Api}/client/favWorker?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setUserModelList(res.data);
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
  const showWorker = async ( id, item) => {
    const res = await axios.get(`${Api}/workerForClient/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    await context.setList(item);
    await context.setList2(res.data);
    console.log("setList2(res)===>", res);
    console.log("item list 1", item);
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
      {/* ::::::: for render the favWorker ::::: */}
      <div>
      <h1>:::::: render favWorker :::::</h1>
        {userModelList.favoriteWorker &&
          userModelList.favoriteWorker.map((item, indx) => {
            return (
              <div key={indx}>
                {item.profilePicture &&
                item.profilePicture.includes("upload") ? (
                  <img src={`${Api}/${item.profilePicture}`} alt={item.id} />
                ) : (
                  <img src={item.profilePicture} alt={item.id} />
                )}
                <p>
                  {item.firstname} {item.lastname}
                </p>
                <p>{item.workType}</p>
                <p>{item.location}</p>
                <button
                  onClick={() => {
                    deleteFavWorker(indx);
                  }}
                >
                  delete worker
                </button>

                <button
                  onClick={() => {
                    showWorker( item.id, item);
                  }}
                >
                  Show Worker
                </button>
              </div>
            );
          })}
          <h1>::::::End render favWorker :::::</h1>
      </div>
      <hr />

      {/* :::::: for render the favoriteImg :::::: 🟢 */}
      <div>
      <h1>:::::: render favoriteImg 🟢:::::</h1>
        {userModelList.favoriteImg &&
          userModelList.favoriteImg.map((item, indx) => {
            return (
              <div key={indx}>
                {item.imges &&
                  item.imges.map((el, indx) => {
                    return el.includes("images") ? (
                      <img src={`${Api}/${el}`} alt={indx} />
                    ) : (
                      <img src={el} alt={indx} />
                    );
                  })}

                <p>{item.title}</p>
                <p>{item.loction}</p>
                <button
                  onClick={() => {
                    deleteFavImg(indx);
                  }}
                >
                  delete Img
                </button>
              </div>
            );
          })}
          <h1>::::::End render favoriteImg 🟢:::::</h1>
      </div>

      <hr />
      {/* for render the recently */}
      <div>
      <h1>:::::: render recently 🟢:::::</h1>
        {userModelList.recently &&
          userModelList.recently.map((item, indx) => {
            return (
              <div key={indx}>
                {item.profilePicture &&
                item.profilePicture.includes("upload") ? (
                  <img src={`${Api}/${item.profilePicture}`} alt={item.id} />
                ) : (
                  <img src={item.profilePicture} alt={item.id} />
                )}
                <p>
                  {item.firstname} {item.lastname}
                </p>
                <p>{item.workType}</p>
                <p>{item.loction}</p>
                <button
                  onClick={() => {
                    deleteRecently(indx);
                  }}
                >
                  delete recently
                </button>
              </div>
            );
          })}
          <h1>:::::: End render recently 🟢:::::</h1>
      </div>

      <h1>::::::  delete  account 🟢:::::</h1>
      <p>from client</p>
      <button onClick={handleDeleteAccount}>delete account</button>

      <h1>:::::: End delete  account 🟢:::::</h1>

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
  );
}

export default ClientProfile;

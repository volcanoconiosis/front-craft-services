import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { LoginContext } from "../../context/Auth";

function WorkerProfile() {
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const token = cookie.load("token");
  const Api = "https://craft-service.herokuapp.com"
  const context = useContext(LoginContext);
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

  // :::::::::: delete account ::::::::::
  const handleDeleteAccount = async () => {
    let res = await axios.delete(`${Api}/deleteaccount`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  };

  //  ::::::::::: delete favWorker ::::::: 🔴🔴
  const deleteFavWorker = async (indx) => {
    let res = await axios.delete(`${Api}/worker/fav?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setWorkerList(res.data);
  };

  // :::: delete fav img ::::: 🔴🔴
  const deleteFavImg = async (indx) => {
    let res = await axios.delete(`${Api}/worker/favimg?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setWorkerList(res.data);
  };

  //:::::delete recintly :::::: 🔴🔴

  const deleteRecently = async (indx) => {
    let res = await axios.delete(`${Api}/worker/recently?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setWorkerList(res.data);
  };

  // :::::: delete from his work ::::::
  const deleteHisWork = async (indx) => {
    let res = await axios.delete(`${Api}/worker/hiswork?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setWorkerList(res.data);
  };

  // :::::: delete from tools ::::::
  const deleteTools = async (indx) => {
    let res = await axios.delete(`${Api}/worker/tools?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setWorkerList(res.data);
  };
  // :::::::: show worker ::::::
  const showWorker = async (userId, id, item) => {
    const res = await axios.get(`${Api}/workerForClient/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    await context.setList(item);
    await context.setList2(res.data);
    console.log("setList2(res)===>", res);
    console.log("item", item);
  };
  // // :::::::::: handleBio
  const [bio, setBio] = useState("");
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
      <h1> render the fav worker from worker profile</h1>
      <button onClick={handleDeleteAccount}>delete account</button>
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
          <img
            src={`${Api}/${workerList.profilePicture}`}
            alt={workerList.id}
          />
        ) : (
          <img src={workerList.profilePicture} alt={workerList.id} />
        )}
        <h1>:::::: End render personal information :::::</h1>
      </div>

      {/* // ::::::::: render the fav worker :::::: 🟢🟡🟡 */}
      <div>
        <h1> ::::::: render the fav worker :::::: 🟢🟡🟡</h1>
        {workerList.favoriteWorker &&
          workerList.favoriteWorker.map((item, indx) => {
            return (
              <div key={indx}>
                {item.profilePicture &&
                item.profilePicture.includes("upload") ? (
                  <img src={`${Api}/${item.profilePicture}`} alt={item.id} />
                ) : (
                  <img src={item.profilePicture} alt={item.id} />
                )}
                <p>
                  name: {item.firstname} {item.lastname}
                </p>
                <p>workType : {item.workType}</p>
                <p> loction: {item.loction}</p>
                <button
                  onClick={() => {
                    deleteFavWorker(indx);
                  }}
                >
                  delete worker
                </button>
                <button
                  onClick={() => {
                    showWorker(item.userId, item.id, item);
                  }}
                >
                  Show Worker
                </button>
              </div>
            );
          })}
        <h1> ::::::: End render the fav worker :::::: 🟢🟡🟡</h1>
      </div>
      <hr />

      {/*  :::::: for render the favoriteImg :::::: 🟢 */}
      <div>
        <h1> ::::::: render the favoriteImg :::::: 🟢🟡🟡</h1>
        {workerList.favoriteImg &&
          workerList.favoriteImg.map((item, indx) => {
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
        <h1> ::::::: End render the favoriteImg :::::: 🟢🟡🟡</h1>
      </div>

      <hr />

      {/* :::::: for render the recintly :::::: 🟢 */}
      <div>
        <h1> ::::::: render the recintly :::::: 🟢🟡🟡</h1>
        {workerList.recently &&
          workerList.recently.map((item, indx) => {
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
        <h1> ::::::: End render the recintly :::::: 🟢🟡🟡</h1>
      </div>

      {/* :::::::: render from his Work ::::::  */}
      <div>
        <h1> ::::::: render the hisWork :::::: 🟢🟡🟡</h1>
        {workerList.hisWork &&
          workerList.hisWork.map((item, indx) => {
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

                <p>{item.date}</p>
                <p>{item.loction}</p>
                <p>{item.description}</p>
                <button
                  onClick={() => {
                    deleteHisWork(indx);
                  }}
                >
                  deleteHisWork
                </button>
              </div>
            );
          })}
        <h1> ::::::: End render the hisWork :::::: 🟢🟡🟡</h1>
      </div>

      {/* :::::::: render from tools ::::::  */}
      
      <div>
        <h1> ::::::: render the tools :::::: 🟢🟡🟡</h1>
        {workerList.tools &&
          workerList.tools.map((item, indx) => {
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
                <p>{item.description}</p>
                <button
                  onClick={() => {
                    deleteTools(indx);
                  }}
                >
                  deleteTools
                </button>
              </div>
            );
          })}
        <h1> :::::::End render the tools :::::: 🟢🟡🟡</h1>
      </div>
          {/* :::::: for render the reviews :::::: 🟢 */}
      <div>
      {/* name: values.name,
      message: values.message,
      date: values.date,
      rate: values.rate, */}
<h1>:::::: for render the reviews :::::: 🟢</h1>
{workerList.reviews &&
          workerList.reviews.map((item, indx) => {
            return (
              <div key={indx}>
                

                <p>{item.name}</p>
                <p>{item.date}</p>
                <p>{item.rate}</p>
                <p>{item.message}</p>
               
              </div>
            );
          })}

      </div>
    </div>

  );
}

export default WorkerProfile;

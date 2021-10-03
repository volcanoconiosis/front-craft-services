import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { LoginContext } from "../../../context/Auth";

function FavWorker() {
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const token = cookie.load("token");
  const Api = process.env.REACT_APP_URL;
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

  //  ::::::::::: delete favWorker ::::::: 🔴🔴
  const deleteFavWorker = async (indx) => {
    let res = await axios.delete(`${Api}/worker/fav?index=${indx}`, {
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

  return (
    <>
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
    </>
  );
}

export default FavWorker;

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { LoginContext } from "../../../context/Auth";

function Recently() {
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const token = cookie.load("token");
  const role = cookie.load("user");
  const Api ="https://craft-service.herokuapp.com"
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
        console.log("from recently==>>", res.data);
      });

    // get worker
    if(role==="worker"){
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
    }else if (role==="user"){
      await axios
      .get(`${Api}/clientData`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWorkerList(res.data[0]);
        console.log("setWorkerList=====>", res.data[0]);
      });
    }
    
  }, []);

  //:::::delete recintly :::::: 🔴🔴

  const deleteRecently = async (indx) => {
    if(role==="worker"){
      let res = await axios.delete(`${Api}/worker/recently?index=${indx}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setWorkerList(res.data);
    }else if(role==="user"){
      let res = await axios.delete(`${Api}/client/recently?index=${indx}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setWorkerList(res.data);
    }
    }
   

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
      <section className="recently-section">
        {workerList.recently &&
          workerList.recently.map((item, indx) => {
            return (
              <div className="fav-worker-card" key={indx}>
                    <div className="profile--card">
                      {item.profilePicture &&
                      item.profilePicture.includes("upload") ? (
                        <img
                          src={`${Api}/${item.profilePicture}`}
                          alt={item.id}
                        />
                      ) : (
                        <img src={item.profilePicture} alt={item.id} />
                      )}

                      <div className="profile--info">
                        <h1 className="profile--h1">
                          {item.firstname} {item.lastname}
                        </h1>
                        <div className="profile--h6s">
                          <h6>{item.workType}</h6>
                          <h6>{item.loction}</h6>
                        </div>
                        <div className="profile--btns">
                          <Button
                            variant="warning"
                            className="btn-sm"
                            onClick={() => {
                              showWorker(item.userId, item.id, item);
                            }}
                          >
                            view profile
                          </Button>

                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => {
                              deleteFavWorker(indx);
                            }}
                          >
                            delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
            );
          })}
      </section>
    </>
  );
}

export default Recently;

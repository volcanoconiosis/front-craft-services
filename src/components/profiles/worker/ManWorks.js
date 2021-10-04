import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";
import HisWork from "../../forms/HisWork";

function ManWorks() {
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const token = cookie.load("token");
  const Api ="https://craft-service.herokuapp.com"

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

  // :::::: delete from his work ::::::
  const deleteHisWork = async (indx) => {
    let res = await axios.delete(`${Api}/worker/hiswork?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setWorkerList(res.data);
  };
  return (
    <>
      <HisWork setUserList={setUserList} setWorkerList={setWorkerList} />
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
    </>
  );
}

export default ManWorks;

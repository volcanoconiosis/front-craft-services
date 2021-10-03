import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";
import ToolsForm from "../../forms/ToolsForm";

function Tools(props) {
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

  // :::::: delete from tools ::::::
  const deleteTools = async (indx) => {
    let res = await axios.delete(`${Api}/worker/tools?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setWorkerList(res.data);
  };

  return (
    <>
    <ToolsForm setWorkerList={setWorkerList}/>
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
    </>
  );
}

export default Tools;

import React, { useContext } from "react";
import { LoginContext } from "../../../context/Auth";
import cookie from "react-cookies";
import axios from "axios";

function WorkerWork() {
  const Api = "https://craft-service.herokuapp.com";
  const context = useContext(LoginContext);
  const role = cookie.load("user");
  const token = cookie.load("token");
  // ============== to add to favImg =================
  async function addFavImg(item) {
    const reqBody = {
      title: item.title,
      description: item.description,
      date: item.date,
      location: item.location,
      imges: item.imges,
    };
    if (role === "user") {
      let res = await axios.post(`${Api}/client/favoriteImg`, reqBody, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("resC===", res);
    } else if (role === "worker") {
      let res = await axios.post(`${Api}/worker/favimg`, reqBody, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("resW===", res);
    }
  }

  return (
    <>
      <h1>rendaring .....</h1>
      {context.list2.hisWork &&
        context.list2.hisWork.map((item, indx) => {
          return (
            <>
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
                <p>{item.date}</p>
                <p>{item.loction}</p>
                <p>{item.description}</p>
                <button
                  onClick={() => {
                    addFavImg(item);
                  }}
                >
                  Add Favorte Images
                </button>
              </div>
            </>
          );
        })}
    </>
  );
}

export default WorkerWork;

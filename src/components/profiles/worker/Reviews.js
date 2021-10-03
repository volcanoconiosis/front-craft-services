import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

function Reviews() {
  
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const token = cookie.load("token");
  const Api = "https://craft-service.herokuapp.com"

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

  return (
    <>
      <div>
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
    </>
  );
}

export default Reviews;

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";

function FavImg() {
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

  // :::: delete fav img ::::: 🔴🔴
  const deleteFavImg = async (indx) => {
    let res = await axios.delete(`${Api}/worker/favimg?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setWorkerList(res.data);
  };

  return (
    <div>
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
    </div>
  );
}

export default FavImg;

import React, { useContext, useState } from "react";
import { LoginContext } from "../../context/Auth";
import cookie from "react-cookies";
import axios from "axios";
import ReviewForm from "../forms/ReviewForm";
function ViewProfile(props) {
  /*
  :::functions::: 
  - useEffect async 
    - get data endPoint( get,"/workerForClient/:id")information that the client will see it  
  
  ::: information ::: display :::
  - data from api
  - button add to fav 
  
  */
  const Api =  process.env.REACT_APP_URL;
  const context = useContext(LoginContext);
  const token = cookie.load("token");
  const role = cookie.load("user");

  // const [show, setShow] = useState(true),
  //   handelclick = (e) => {
  //     //  setShow(false);
  //   }
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
      <div>

        
        <h1>:::::::: view profile Page :::::: 😍😎</h1>
        <p>{context.list.username}</p>
        <p>{context.list.id}</p>
        <p>
          {context.list.firstName} {context.list.lastName}
        </p>
        <p>{context.list.workType}</p>
        <p>{context.list.location}</p>
        <p> bio:{context.list2.bio}</p>
        {context.list.profilePicture &&
        context.list.profilePicture.includes("upload") ? (
          <img src={`${Api}/${context.list.profilePicture}`} />
          ) : (
            <img src={context.list.profilePicture} />
            )}
      </div>
      <div>
        <h3>render the review </h3>.
            <ReviewForm/>
            {context.list2.reviews &&
          context.list2.reviews.map((item, indx) => {
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
      <div>
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
 
        <h1>::::::::: End view profile Page :::::: 😍😎</h1>
      </div>
     
    </>
  );
}

export default ViewProfile;

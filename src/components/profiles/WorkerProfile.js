import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

function WorkerProfile() {
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const token = cookie.load("token");
  const Api = "https://craft-service.herokuapp.com";
  /*
    :::functions::: 
    - useEffect async 
      - get data endPoint( get,"/getCurrentUser")information personal about worker
      - get data endPoint( get,"/worker")information model about client
      
     */
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

  /*



    - delete account ("/deleteaccount")
    - updat account ("/updateaccount")
    - handle the role for worker to open this page
    
    ::: information ::: display :::
    - favWorker  obj for almost all  below arrays 😭
       - obj { 
          id:id,
          firstname:firstname,
          lastname:lastname,
          profilePicture:profilePicture,
          workType:workType,
          loction:loction
            }

            
      - :::: add to fav ${Api}/worker/fav will be in services page and view profile :::   
      - ::::::::::: delete favWorker ::::::: 🔴🔴 
      - ::::::::: render the fav worker :::::: 🟢🟡🟡
      
      "firstname":"firstname",
          "lastname":"lastname",
          "profilePicture":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTThnO8e3DASTH1Q6Kfqr-1qeNfUhr7vB4TjQ&usqp=CAU",
          "workType":"workType",
          "loction":"loction",
          "id":1
            

    - favImg
       - obj {
          img:img,
          description:description
            }

        - :::: delete fav img ::::: 🔴🔴
        - :::: render fav img ::::: 
              "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTThnO8e3DASTH1Q6Kfqr-1qeNfUhr7vB4TjQ&usqp=CAU",
          "description":"description",
          "id":number

        - 

    - recintly 
       - obj {
          id:id,
          firstname:firstname,
          lastname:lastname,
          profilePicture:profilePicture,
          workType:workType,
          loction:loction
            }


            - :::::delete recintly :::::: 🔴🔴


          - :::::: for render the recintly :::::: 🟢

          "firstname":"firstname",
          "lastname":"lastname",
          "profilePicture":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTThnO8e3DASTH1Q6Kfqr-1qeNfUhr7vB4TjQ&usqp=CAU",
          "workType":"workType",
          "loction":"loction",
          "id":1

    - chat
    - store  =======================🧡❤💛
    - his work 
      - form inside this component to give feedback
      - title
      - img 
      - description 
      - date 2/2/2022
      - loction 
      
     - :::::: add to his work (post)  we make it in forms/HisWork :::::: 
     - :::::: update to his work (put)   :::::: 

          for updata handle its like the form inside forms/HisWork  but we need to 
          change the method 
          <form onSubmit={handleSubmit}>
        
        <input
          type="file"
          multiple
          accept="image/*"
          name="uploadedImages"
          defaultValue={workerList.img}
          onChange={handleImg}
        />

        <input
          type="text"
          placeholder="title"
          name="title"
          defaultValue={workerList.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="location"
          name="location"
          defaultValue={workerList.location}
          onChange={handleChange}
        />
        <textarea
          name="description"
          rows="4"
          cols="50"
          onChange={handleChange}
          defaultValue={workerList.description}
          placeholder="description"
        />
        <input
          type="datetime-local"
          name="date"
          defaultValue={workerList.date}
          onChange={handleChange}
        />
        <button type="submit">upload</button>
      </form>



     - :::::: delete from his work :::::: 
    
    - :::::::: render from his Work :::::: 
      




    - sechedul work 
    - offers
      - form inside this component to give feedback  (cansle for know)
    - tools 
      - img 
      - description 
      - title 

      - :::::: add to tools (post)  we make it in forms/Tools :::::: 
     - :::::: update to his work (put)   :::::: 

          for updata handle its like the form inside forms/Tools  but we need to 
          change the method 
          
          <form onSubmit={handleSubmit...}>
        <label for="file">Select your image:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          name="uploadedImages"
          onChange={handleImg}
          defaultValue={workerList.img}
        />

        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
          defaultValue={workerList.title}
        />
        <textarea
          name="description"
          rows="4"
          cols="50"
          onChange={handleChange}
          placeholder="description"
           defaultValue={workerList.description}
        />
        <button type="submit">upload</button>
      </form>



     - :::::: delete from tools :::::: 
    - :::::::: render from tools :::::: 

    - form inside this component to give feedback for review i mean 
          we handle it the form inside the forms/Review 
    - review 🔼🔼
    - form inside this component to give feedback
    - name 
    - message 
    - out of 5 
    ::: links :::   dont forget Routes to transform between pages

    
    
    */
  return (
    <div>
      <h1> render the fav worker from worker profile</h1>
      <button onClick={handleDeleteAccount}>delete account</button>
      <div>
        {/*  :::::: render personal information ::::: */}
        <p>{userList.username}</p>
        <p>{userList.id}</p>

        {workerList.profilePicture &&
        workerList.profilePicture.includes("upload") ? (
          <img
            src={`${Api}/${workerList.profilePicture}`}
            alt={workerList.id}
          />
        ) : (
          <img src={workerList.profilePicture} alt={workerList.id} />
        )}
      </div>

      {/* // ::::::::: render the fav worker :::::: 🟢🟡🟡 */}
      <div>
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
                  {item.firstname} {item.lastname}
                </p>
                <p>{item.workType}</p>
                <p>{item.loction}</p>
                <button
                  onClick={() => {
                    deleteFavWorker(indx);
                  }}
                >
                  delete worker
                </button>
              </div>
            );
          })}
      </div>
      <hr />

      {/*  :::::: for render the favoriteImg :::::: 🟢 */}
      <div>
        {workerList.favoriteImg &&
          workerList.favoriteImg.map((item, indx) => {
            return (
              <div key={indx}>
                {item.img && item.img.includes("upload") ? (
                  <img src={`${Api}/${item.img}`} alt={item.id} />
                ) : (
                  <img src={item.img} alt={item.id} />
                )}
                <p>{item.description}</p>
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
      </div>

      <hr />

      {/* :::::: for render the recintly :::::: 🟢 */}
      <div>
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
      </div>

      {/* :::::::: render from his Work ::::::  */}
      <div>
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
      </div>

      {/* :::::::: render from tools ::::::  */}
      <div>
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
      </div>
    </div>
  );
}

export default WorkerProfile;

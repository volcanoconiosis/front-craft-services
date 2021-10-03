import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../context/Auth";
import cookie from "react-cookies";

function Services() {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [filterlist, setFilterlist] = useState([]);
  const [worktype, setWorktype] = useState("");
  const context = useContext(LoginContext);
  const token = cookie.load("token");
  const role = cookie.load("user");

  const Api ="https://craft-service.herokuapp.com"

  useEffect(async() => {
   await axios.get(`${Api}/getAllWorkers`).then((res) => {
      setList(res.data);
      setFilterlist(res.data);
      console.log("dddddddddddddddddddddd", res.data);
    });
   await axios.get(`${Api}/getWorkersData`).then((res) => {
      setList2(res.data);
      console.log("ssssssssssss", res.data);
    });
  }, []);

  const handleChange = (e) => {
    setWorktype(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (worktype === "all") {
      setFilterlist(list);
    } else {
      let filter = list.filter((item) => {
        return item.workType === worktype ? item.workType : "";
      });
      console.log("worType-->", worktype);
      console.log("filter-->", filter);
      setFilterlist(filter);
    }
  };
  const handelclick = async (item, oo) => {
    let items=item
    items.profilePicture=oo.profilePicture
    await context.setList(items);
    await context.setList2(oo);
    
  };
  
    console.log("list22-->", context.list2);
    console.log("list-->", context.list);

  const handelAddToFav = async (item, oo) => {
    const reqBody = {
      id: item.id,
      userId: oo.userId,
      username: item.username,
      firstname: item.firstName,
      workType: item.workType,
      location: item.location,
      lastname: item.lastName,
      profilePicture: oo.profilePicture,
    };
    if (role === "user") {
      let res = await axios.post(`${Api}/client/favWorker`, reqBody, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("resC===", res);
    } else if (role === "worker") {
      let res = await axios.post(`${Api}/worker/fav`, reqBody, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("resW===", res);
    }
  };

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <label>filter by work type</label>
        <select name="workType" onChange={handleChange} placeholder="workType">
          <option value="all" name="all">
            all
          </option>
          <option value="moserje" name="moserje">
            moserje
          </option>
          <option value="khrabje" name="khrabje">
            {" "}
            khrabje
          </option>
          <option value="bleet" name="bleet">
            bleet
          </option>
          <option value="dheen" name="dheen">
            dheen
          </option>
        </select>
        <button>click</button>
      </form>
      <br></br>

      {list.length > 0 &&
        list2.length > 0 &&
        filterlist.map((item) => {
          let oo = list2.find((o) => o.userId === item.id);

          return (
            <>
              {oo.profilePicture.includes("upload") ? (
                <img src={`${Api}/${oo.profilePicture}`} />
              ) : (
                <img src={oo.profilePicture} />
              )}

              <p>{item.username}</p>
              <p>{item.id}</p>
              <p>
                {item.firstName} {item.lastName}
              </p>
              <p>{item.workType}</p>
              <p>{item.location}</p>
              <button
                onClick={() => {
                  handelclick(item, oo);
                }}
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  handelAddToFav(item, oo);
                }}
              >
                Add
              </button>

              <hr />
            </>
          );
        })}
    </div>
  );
}

export default Services;

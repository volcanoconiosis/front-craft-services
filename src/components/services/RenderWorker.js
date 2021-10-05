import Pagination from "@mui/material/Pagination";
import "./RenderWorker.css";
import { useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../context/Auth";
import cookie from "react-cookies";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
function RenderWorker(props) {
  const context = useContext(LoginContext);
  const token = cookie.load("token");
  const role = cookie.load("user");
  const Api = "https://craft-service.herokuapp.com";
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 9;
  const pagesVisited = pageNumber * usersPerPage;

  const handelclick = async (item, oo) => {
    if(token){
      let items = item;
      items.profilePicture = oo.profilePicture;
      await context.setList(items);
      await context.setList2(oo);
      context.setSocketid(oo.userId);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'you need to be logedIn',
        footer: '<a href="/">Click Her To Sign-Up Of You Dont Have An Account</a>'//add route signUp
      })

    }
    
  };

  const handelAddToFav = async (item, oo) => {
    if(token){
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'your item has been save',
          showConfirmButton: false,
          timer: 1500
        })
        
      } else if (role === "worker") {
        let res = await axios.post(`${Api}/worker/fav`, reqBody, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'your item has been save',
          showConfirmButton: false,
          timer: 1500
        })
      }

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'you need to be logedIn',
        footer: '<a href="/">Click Her To Sign-Up Of You Dont Have An Account</a>'//add route signUp
      })
    }
    
  };
  const displayUser =
    props.list.length > 0 &&
    props.list2.length > 0 &&
    props.filterlist
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((item, indx) => {
        let oo = props.list2.find((o) => o.userId === item.id);

        return (
          <>
            <div class="col-12 col-md-4" key={indx}>
              <div
                class="rt-profile-card"
                style={{
                  backgroundImage:
                    "url(https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg)",
                  height: "400px",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "380px ",
                }}
              >
                {oo.profilePicture.includes("upload") ? (
                  <img
                    src={`${Api}/${oo.profilePicture}`}
                    className="full-width img-fluid"
                    alt="imag"
                  />
                ) : (
                  <img
                    src={oo.profilePicture}
                    className="full-width img-fluid"
                    alt="imag"
                  />
                )}

                <div class="rt-profile-body">
                  <div class="rt-profile-name">
                    {item.firstName}
                    <br />
                    {item.listName}
                  </div>
                  <div class="rt-profile-text">
                    <p
                      style={{
                        color: "white",
                        fontWeight: "800",
                        textTransform: "capitalize",
                        fontSize: "20px",
                      }}
                    >
                      <span style={{ color: "black", fontWeight: "800" }}>
                        workType :
                      </span>{" "}
                      {item.workType}
                    </p>
                    <p
                      style={{
                        color: "white",
                        fontWeight: "800",
                        textTransform: "capitalize",
                        fontSize: "20px",
                      }}
                    >
                      <span style={{ color: "black", fontWeight: "800" }}>
                        location :
                      </span>
                      {item.location}
                    </p>
                    <Button
                      variant="warning"
                      style={{
                        display: "inline",
                        width: "130px",
                        borderRadius: "15px",
                      }}
                      onClick={() => {
                        handelAddToFav(item, oo);
                      }}
                    >
                      Add Fav<i class="fas fa-heart"></i>
                    </Button>
                    <Button
                      style={{
                        display: "inline",
                        width: "130px",
                        borderRadius: "15px",
                      }}
                      variant="info"
                      onClick={() => {
                        handelclick(item, oo);
                      }}
                    >
                      profile<i class="fas fa-external-link-alt"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      });
  const pageCount = Math.ceil(props.filterlist.length / usersPerPage);
  const changePage = (event, value) => {
    setPageNumber(value - 1);
    console.log(value);
  };
  return (
    <>
      <div class="container" style={{ margin: "80px auto 100px auto" }}>
        <div class="row">{displayUser}</div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "100px auto 80px auto",
        }}
      >
        <Pagination count={pageCount} color="primary" onChange={changePage} />
      </div>
    </>
  );
}

export default RenderWorker;

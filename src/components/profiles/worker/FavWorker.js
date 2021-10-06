import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { LoginContext } from "../../../context/Auth";
import "./wrokerStyle/favWorker.css";
import { Button, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
function FavWorker() {
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const token = cookie.load("token");
  const role = cookie.load("user");
  const Api = "https://craft-service.herokuapp.com";
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
        console.log(res.data);
      });

    // get worker
    if (role === "worker") {
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
    } else if (role === "user") {
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

  
  //  ::::::::::: delete favWorker ::::::: 🔴🔴
  const deleteFavWorker = async (indx) => {
    if (role === "worker") {
    

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(async(result) => {
        if (result.isConfirmed) {
          let res = await axios.delete(`${Api}/worker/fav?index=${indx}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          setWorkerList(res.data);
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    } else if (role === "user") {
      

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true

      }).then(async(result) => {
        if (result.isConfirmed) {
          let res = await axios.delete(`${Api}/client/favWorker?index=${indx}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          setWorkerList(res.data);
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    }
  };

  // :::::::: show worker ::::::
  const showWorker = async (userId, id, item) => {
    const res = await axios.get(`${Api}/workerForClient/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log("ressssssssssssssss",res);
    const response = await axios.get(`${Api}/getWorkersData`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log("ressssssssppppppppp",response);
  
    
    
    
    let oop = response.data.find((o) => o.userId === item.id);
    let items = res.data;
      items.profilePicture = oop.profilePicture;
    cookie.save("list",items)
    cookie.save("list2",oop)
    cookie.save("socketid",oop.userId)
    window.location.href="/viewprofile"
   
  };

  return (
    <>
      <section className="fav-worker-section">
        <Container>
          <Row>
            {workerList.favoriteWorker &&
              workerList.favoriteWorker.map((item, indx) => {
                return (
                  <div className="fav-worker-card fav-img" key={indx}>
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
          </Row>
        </Container>
      </section>
    </>
  );
}

export default FavWorker;

import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Container, Row ,Button} from "react-bootstrap";
import "./wrokerStyle/favImg.css";
import Swal from "sweetalert2";
function FavImg() {
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const token = cookie.load("token");
  const role = cookie.load("user");
  const Api = "https://craft-service.herokuapp.com";
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

  // :::: delete fav img ::::: 🔴🔴
  const deleteFavImg = async (indx) => {

    
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
          let res = await axios.delete(`${Api}/worker/favimg?index=${indx}`, {
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
          let res = await axios.delete(`${Api}/client/favoriteImg?index=${indx}`, {
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

  return (
    <div>
      <section className="fav-Img-section">
        <Container>
          <Row>
            {workerList.favoriteImg &&
              workerList.favoriteImg.map((item, indx) => {
                return (
                  <div className="fav-worker-card" key={indx}>
                    <div className="profile--card">
                      {item.imges &&
                        item.imges.map((el, indx) => {
                          return el.includes("images") ? (
                            <img src={`${Api}/${el}`} alt={indx} />
                          ) : (
                            <img src={el} alt={indx} />
                          );
                        })}

                      <div className="profile--info">
                        <h1 className="profile--h1">
                          {item.firstname} {item.lastname}
                        </h1>
                        <div className="profile--h6s">
                          <h6>{item.title}</h6>
                          <h6>{item.loction}</h6>
                        </div>
                        <div className="profile--btns">
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => {
                              deleteFavImg(indx);
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
    </div>
  );
}

export default FavImg;


import cookie from "react-cookies";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
function WorkerWork() {
  const Api = "https://craft-service.herokuapp.com";
  const list2=cookie.load("list2");
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
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'your item has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <>
      {list2.hisWork &&
        list2.hisWork.map((item, indx) => {
          return (
            <Container>
              <Row className="mt-5 his-worke-card-container">
                <Card key={indx} style={{ width: "15rem" }}>
                  <Row>
                    <Col>
                      <div className="card-img-contianer">
                        {item.imges &&
                          item.imges.map((el, indx) => {
                            return el.includes("images") ? (
                              <Card.Img src={`${Api}/${el}`} alt={indx} />
                            ) : (
                              <Card.Img src={el} alt={indx} />
                            );
                          })}
                      </div>
                    </Col>
                    <Col>
                      <Card.Body>
                        <ListGroup>
                          <ListGroupItem>
                            <strong>Date: </strong>
                            {item.date}
                          </ListGroupItem>
                          <ListGroupItem>
                            <strong>Location:</strong>
                            {item.location}
                          </ListGroupItem>
                          <ListGroupItem>
                            <strong>Description:</strong>
                            {item.description}
                          </ListGroupItem>
                        </ListGroup>
                      </Card.Body>
                    </Col>
                    <Col className="his-work-btn">
                      <Button
                        onClick={() => {
                          addFavImg(item);
                        }}
                      >
                        Add Favorte Images
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Row>
            </Container>
          );
        })}
    </>
  );
}

export default WorkerWork;

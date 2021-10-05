import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";
import ToolsForm from "../../forms/ToolsForm";
import "./wrokerStyle/tools.css"
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
} from "react-bootstrap";
function Tools(props) {
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const token = cookie.load("token");
  const Api = "https://craft-service.herokuapp.com";
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  // :::::: delete from tools ::::::
  const deleteTools = async (indx) => {
    let res = await axios.delete(`${Api}/worker/tools?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setWorkerList(res.data);
  };

  return (
    <>
      <section className="tools-worker-section">
        <Container>
          <Row>
            <Col xs={4}></Col>
            <Col xs={4} style={{ textAlign: "center" }}>
              <Button variant="primary" onClick={handleShow}>
                Add One +
              </Button>
            </Col>
            <Col xs={4}></Col>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add new work</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ToolsForm setWorkerList={setWorkerList} 
                setShow={setShow}/>
              </Modal.Body>
            </Modal>
          </Row>

          {workerList.tools &&
            workerList.tools.map((item, indx) => {
              return (
                <Row className="mt-5 his-worke-card-container">
                  <Card key={indx} style={{ width: "15rem" }}>
                    <Row>
                      <Col xs={5}>
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
                      <Col xs={5}>
                        <Card.Body>
                          <ListGroup>
                            <ListGroupItem>
                              <strong>Title: </strong>
                              {item.title}
                            </ListGroupItem>
                            <ListGroupItem>
                              <strong>Description: </strong>
                              {item.description}
                            </ListGroupItem>
                          </ListGroup>
                        </Card.Body>
                      </Col>
                      <Col className="his-work-btn" xs={2}>
                        <Button
                          variant="danger"
                          onClick={() => {
                            deleteTools(indx);
                          }}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Row>
              );
            })}
        </Container>
      </section>
    </>
  );
}

export default Tools;

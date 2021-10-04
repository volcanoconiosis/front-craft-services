import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";
import HisWork from "../../forms/HisWork";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

function ManWorks() {
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

  // :::::: delete from his work ::::::
  const deleteHisWork = async (indx) => {
    let res = await axios.delete(`${Api}/worker/hiswork?index=${indx}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setWorkerList(res.data);
  };
  return (
    <>
      <section className="his-worke-section">
        <Container>
          <Row>
            <Col>
              <Button variant="primary" onClick={handleShow}>
                Add One +
              </Button>
            </Col>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add new work</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <HisWork setUserList={setUserList} setWorkerList={setWorkerList} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Row>
          <Row></Row>
        </Container>
      </section>
      
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
        <h1> ::::::: End render the hisWork :::::: 🟢🟡🟡</h1>
      </div>
    </>
  );
}

export default ManWorks;

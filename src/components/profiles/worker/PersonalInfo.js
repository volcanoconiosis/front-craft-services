import { useEffect, useState, useContext } from "react";
import axios from "axios";
import cookie from "react-cookies";
import "./wrokerStyle/personalWorker.css";
import {
  Container,
  Row,
  Col,
  FloatingLabel,
  Form,
  Button,
  Modal,
} from "react-bootstrap";

function PersonalInfo() {
  const [userList, setUserList] = useState({});
  const [workerList, setWorkerList] = useState({});
  const [bio, setBio] = useState("");
  const [edite, setEdite] = useState(true);
  const [btnColor, setBtnColor] = useState("warning");
  const [values, setValues] = useState({});
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

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log("from sign worker:", values);
  }

  const openForm = () => {
    setEdite(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();

    const reqBody = {
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: userList.role,
      workType: userList.workType,
      phone: values.phone,
      store: userList.store,
      location: values.location,
      id: userList.id,
    };
    await axios
      .put(`${Api}/updateaccount`, reqBody, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
    setEdite(true);
  };

  const handleBio = (e) => {
    setBio(e.target.value);
    console.log(bio);
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    let reqBody = {
      bio: bio,
    };
    let res = await axios.put(`${Api}/worker/updateany`, reqBody, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log("res after change bio", res);
    setWorkerList(res.data);
  };

  // ============================== change Img =================================
  const [imges, setImg] = useState({});
  const role = "worker";
  const handleImg = async (e) => {
    setImg(e.target.files);
  };
  console.log("imges;;;;;;;;;;;;;;;;;;;", typeof imges);

  const handleSubmitImg = async (e) => {
    e.preventDefault();
    const body = new FormData();
    for (const file of Object.entries(imges)) {
      file.forEach((el) => {
        if (typeof el === "object") {
          body.append("userImg", el);
        }
      });
    }
    console.log("----------------", body);

    let filePic = await axios({
      method: "post",
      url: `${Api}/profilepicture`,
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    });
    let pathImges = filePic.data;

    let reqBody = {
      profilePicture: pathImges,
    };
    if (role === "user") {
      let res = await axios.put(`${Api}/client/updateany`, reqBody, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
    } else if (role === "worker") {
      let res = await axios.put(`${Api}/worker/updateany`, reqBody, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
    }
  };

  return (
    <>
      {/*  :::::: render personal information ::::: */}
      <section className="personal-section">
        <Container>
          <Row>
            <Col xs={1}>
              <div className="personal-info-img">
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
            </Col>
            <Col xs={4}>
              
              <button
                variant="primary"
                className="personal-change-imgbtn"
                onClick={handleShow}
              >
                Change
              </button>
              {/* ================ modal ============== */}
              <div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Change Profile Picture</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <form onSubmit={handleSubmitImg}>
                        <label for="file">Select your image:</label>
                        <Form.Control
                          type="file"
                          multiple
                          accept="image/*"
                          name="uploadedImages"
                          onChange={handleImg}
                        />
                        <Button type="submit">upload</Button>
                      </form>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="personal-info-top">
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={handleChange}
                  defaultValue={userList.username}
                  disabled={edite}
                />
              </Col>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  defaultValue={userList.firstName}
                  disabled={edite}
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  defaultValue={userList.lastName}
                  disabled={edite}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  defaultValue={userList.password}
                  disabled={edite}
                />
              </Col>
              <Col>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  defaultValue={userList.phone}
                  disabled={edite}
                />
              </Col>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  defaultValue={userList.email}
                  disabled={edite}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  onChange={handleChange}
                  defaultValue={userList.location}
                  disabled={edite}
                />
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
            {!edite && (
              <Row className="mb-3">
                <Col md={5}></Col>
                <Col md={5}>
                  <Button type="submit" variant="success">
                    {" "}
                    Save
                  </Button>
                </Col>
                <Col md={2}></Col>
              </Row>
            )}
          </form>
          {edite && (
            <Row className="mb-3">
              <Col md={5}></Col>
              <Col md={5}>
                <Button type="button" variant="warning" onClick={openForm}>
                  {" "}
                  Update
                </Button>
              </Col>
              <Col md={2}></Col>
            </Row>
          )}
        </div>

        <div className="personal-info-middle">
          <form onSubmit={handleBioSubmit}>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Bio"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={handleBio}
                defaultValue={workerList.bio}
                className="text"
              />
            </FloatingLabel>
            <Row>
              <Col md={5}></Col>
              <Col md={5}>
                <Button type="submit" variant="success">
                  Save
                </Button>
              </Col>
              <Col md={2}></Col>
            </Row>
          </form>
        </div>
      </section>
    </>
  );
}

export default PersonalInfo;

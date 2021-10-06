import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
import cookie from "react-cookies";
function PersonalInformation() {
  const Api = "https://craft-service.herokuapp.com";

  const list = cookie.load("list");

  return (
    <>
      <form>
        <Row className="mb-3" style={{ justifyContent: "center" }}>
          <Col>
            <div className="view-personal-info-img">
              {list.profilePicture && list.profilePicture.includes("upload") ? (
                <img src={`${Api}/${list.profilePicture}`} alt="img" />
              ) : (
                <img src={list.profilePicture} alt="img" />
              )}
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              defaultValue={list.firstName}
              disabled={true}
            />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              defaultValue={list.lastName}
              disabled={true}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              defaultValue={list.phone}
              disabled={true}
            />
          </Col>
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={list.email}
              disabled={true}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              defaultValue={list.location}
              disabled={true}
            />
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Bio"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              defaultValue={list.bio}
              disabled
            />
          </FloatingLabel>
        </Row>
      </form>
    </>
  );
}

export default PersonalInformation;

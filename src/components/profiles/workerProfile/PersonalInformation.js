import { useContext } from "react";
import { LoginContext } from "../../../context/Auth";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";
function PersonalInformation() {
  const Api = "https://craft-service.herokuapp.com";
  const context = useContext(LoginContext);
  return (
    <>
      <form>
        <Row className="mb-3" style={{ justifyContent: "center" }}>
          {context.list.profilePicture &&
          context.list.profilePicture.includes("upload") ? (
            <img
              src={`${Api}/${context.list.profilePicture}`}
              style={{ width: "11.1rem", height: "10rem", borderRadius: "50%" }}
            />
          ) : (
            <img src={context.list.profilePicture} />
          )}
        </Row>
        <hr />
        <Row className="mb-3">
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              defaultValue={context.list.firstName}
              disabled={true}
            />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              defaultValue={context.list.lastName}
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
              defaultValue={context.list.phone}
              disabled={true}
            />
          </Col>
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={context.list.email}
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
              defaultValue={context.list.location}
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
              defaultValue={context.list.bio}
              disabled
            />
          </FloatingLabel>
        </Row>
      </form>

    </>
  );
}

export default PersonalInformation;

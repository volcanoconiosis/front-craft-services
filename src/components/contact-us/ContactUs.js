import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import React, { useState } from "react";
import { MDBIcon, MDBInput } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./contact.css";

export default function ContactUs() {
  const [show, setShow] = useState(false);
  const handleModal = () => {
    setShow(!show);
  };
  let [values, setValues] = useState({});
  let Api = "https://craft-service.herokuapp.com";

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log("from contact-us comp:", values);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setShow(!show);
    console.log("from contacut ");
    const reqBody = {
      name: values.name,
      Subject: values.Subject,

      email: values.email,
      message: values.message,
    };
    let res = await axios.post(`${Api}/support`, reqBody);
    console.log("res---------", res);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "your message has been sent",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <>
      <Modal show={show} onHide={handleModal} closeButton>
        <Modal.Header className="profile-modal-header" closeButton>
          <h3 style={{ textAlign: "center" }}>Contact Us</h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <p className="h5 text-center mb-4">Give Us Your FeedBack</p>
            <div className="grey-text">
              <MDBInput
                label="Your name"
                icon="user"
                type="text"
                name="name"
                onChange={handleChange}
              />

              <MDBInput
                label="Your email"
                icon="envelope"
                type="email"
                name="email"
                onChange={handleChange}
              />

              <MDBInput
                label="Subject"
                icon="tag"
                type="text"
                onChange={handleChange}
                name="Subject"
              />
              <MDBInput
                type="textarea"
                rows="2"
                label="Your message"
                icon="pencil-alt"
                onChange={handleChange}
                name="message"
              />
              <div className="text-center">
                <Button type="submit">
                  send <MDBIcon far icon="paper-plane" className="ml-1" />
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <div id="feedback">
        <a
          href="#"
          type="button"
          class="btn btn-info btn-lg"
          data-toggle="modal"
          onClick={handleModal}
        >
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI5LjI5OXB4IiBoZWlnaHQ9IjUwLjYyNXB4IiB2aWV3Qm94PSIwIDAgOS4yOTkgNTAuNjI1IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA5LjI5OSA1MC42MjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0zLjUxNiw0Ni44N3YxLjYzNWg1LjY2N3YwLjk3NEgzLjUxNnYxLjE0N2gtMC40NGwtMC4zNTItMS4xNDdIMi4zNjdDMC43ODksNDkuNDc4LDAsNDguNzg4LDAsNDcuNDA5YzAtMC4zNCwwLjA2OC0wLjczOCwwLjIwNS0xLjE5NWwwLjc3OSwwLjI1MmMtMC4xMjEsMC4zNzUtMC4xODIsMC42OTUtMC4xODIsMC45NjFjMCwwLjM2NywwLjEyMiwwLjY0LDAuMzY2LDAuODE0YzAuMjQ0LDAuMTc2LDAuNjM2LDAuMjY0LDEuMTc1LDAuMjY0SDIuNzZWNDYuODdIMy41MTZ6Ii8+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTkuMjk5LDQyLjk4NWMwLDAuOTQ5LTAuMjg5LDEuNjk3LTAuODY2LDIuMjQ2Yy0wLjU3OCwwLjU0OS0xLjM4MiwwLjgyNC0yLjQwOCwwLjgyNGMtMS4wMzYsMC0xLjg1Ny0wLjI1Ni0yLjQ2Ny0wLjc2NmMtMC42MS0wLjUxMS0wLjkxNC0xLjE5My0wLjkxNC0yLjA1NGMwLTAuODA1LDAuMjY1LTEuNDQsMC43OTQtMS45MDljMC41MjktMC40NywxLjIyOC0wLjcwMywyLjA5NS0wLjcwM2gwLjYxNXY0LjQyNGMwLjc1NC0wLjAyMSwxLjMyNi0wLjIxMSwxLjcxNy0wLjU3MlM4LjQ1LDQzLjYwNiw4LjQ1LDQyLjk1YzAtMC42OTEtMC4xNDUtMS4zNzUtMC40MzQtMi4wNTFoMC44NjZjMC4xNDgsMC4zNDQsMC4yNTUsMC42NjgsMC4zMTksMC45NzVDOS4yNjcsNDIuMTgxLDkuMjk5LDQyLjU1MSw5LjI5OSw0Mi45ODV6IE0zLjQ1Nyw0My4yNDljMCwwLjUxNywwLjE2OCwwLjkyNiwwLjUwNCwxLjIzMnMwLjgwMSwwLjQ4OCwxLjM5NiwwLjU0M3YtMy4zNTdjLTAuNjEzLDAtMS4wODMsMC4xMzgtMS40MSwwLjQxQzMuNjIxLDQyLjM1LDMuNDU3LDQyLjc0MSwzLjQ1Nyw0My4yNDl6Ii8+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTkuMjk5LDM2LjI1MmMwLDAuOTQ5LTAuMjg5LDEuNjk3LTAuODY2LDIuMjQ2Yy0wLjU3OCwwLjU0OS0xLjM4MiwwLjgyNC0yLjQwOCwwLjgyNGMtMS4wMzYsMC0xLjg1Ny0wLjI1Ni0yLjQ2Ny0wLjc2NmMtMC42MS0wLjUxLTAuOTE0LTEuMTkzLTAuOTE0LTIuMDUzYzAtMC44MDUsMC4yNjUtMS40NDEsMC43OTQtMS45MXMxLjIyOC0wLjcwMywyLjA5NS0wLjcwM2gwLjYxNXY0LjQyNGMwLjc1NC0wLjAyLDEuMzI2LTAuMjExLDEuNzE3LTAuNTcyczAuNTg2LTAuODY5LDAuNTg2LTEuNTI1YzAtMC42OTEtMC4xNDUtMS4zNzUtMC40MzQtMi4wNTFoMC44NjZjMC4xNDgsMC4zNDQsMC4yNTUsMC42NjgsMC4zMTksMC45NzZTOS4yOTksMzUuODE5LDkuMjk5LDM2LjI1MnogTTMuNDU3LDM2LjUxNmMwLDAuNTE2LDAuMTY4LDAuOTI2LDAuNTA0LDEuMjMyYzAuMzM2LDAuMzA4LDAuODAxLDAuNDg4LDEuMzk2LDAuNTQzdi0zLjM1N2MtMC42MTMsMC0xLjA4MywwLjEzNy0xLjQxLDAuNDFDMy42MjEsMzUuNjE4LDMuNDU3LDM2LjAwOCwzLjQ1NywzNi41MTZ6Ii8+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTguMzE5LDI3Ljg2MnYwLjA1M2MwLjY1MiwwLjQ0OSwwLjk3OSwxLjEyMSwwLjk3OSwyLjAxN2MwLDAuODQtMC4yODYsMS40OTMtMC44NiwxLjk2UzcuMDQ3LDMyLjU5LDUuOTg5LDMyLjU5Yy0xLjA1OCwwLTEuODgxLTAuMjMzLTIuNDY3LTAuNzAyYy0wLjU4Ni0wLjQ3LTAuODc5LTEuMTIxLTAuODc5LTEuOTU3YzAtMC44NzEsMC4zMTYtMS41MzksMC45NDktMi4wMDVWMjcuODVsLTAuNDYzLDAuMDQxbC0wLjQ1MSwwLjAyM0gwLjA2NHYtMC45NzRoOS4xMTd2MC43OTFMOC4zMTksMjcuODYyeiBNOC40ODMsMjkuODA3YzAtMC42NjQtMC4xOC0xLjE0Ni0wLjU0MS0xLjQ0NHMtMC45NDQtMC40NDgtMS43NS0wLjQ0OEg1Ljk4N2MtMC45MDksMC0xLjU1OSwwLjE1MS0xLjk0NywwLjQ1NWMtMC4zODgsMC4zMDMtMC41ODMsMC43ODUtMC41ODMsMS40NDljMCwwLjU3LDAuMjIyLDEuMDA4LDAuNjY1LDEuMzExUzUuMTksMzEuNTgzLDYsMzEuNTgzYzAuODE5LDAsMS40MzgtMC4xNDksMS44NTYtMC40NTFDOC4yNzQsMzAuODMxLDguNDgzLDMwLjM4OSw4LjQ4MywyOS44MDd6Ii8+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTIuNjU0LDIxLjg5MWMwLTAuODQ0LDAuMjg4LTEuNDk5LDAuODY0LTEuOTY2YzAuNTc2LTAuNDY3LDEuMzkyLTAuNywyLjQ0Ni0wLjdjMS4wNTUsMCwxLjg3NCwwLjIzNSwyLjQ1OCwwLjcwNmMwLjU4NCwwLjQ3MSwwLjg3NiwxLjEyNCwwLjg3NiwxLjk2YzAsMC40MTgtMC4wNzYsMC44LTAuMjMsMS4xNDZjLTAuMTU0LDAuMzQ2LTAuMzkzLDAuNjM2LTAuNzEzLDAuODd2MC4wN2wwLjgyNiwwLjIwNXYwLjY5N0gwLjA2NHYtMC45NzNoMi4yMTVjMC40OTYsMCwwLjk0MSwwLjAxNiwxLjMzNiwwLjA0N3YtMC4wNDdDMi45NzUsMjMuNDU0LDIuNjU0LDIyLjc4MiwyLjY1NCwyMS44OTF6IE0zLjQ2OSwyMi4wMzJjMCwwLjY2NCwwLjE5LDEuMTQzLDAuNTcxLDEuNDM2czEuMDIyLDAuNDM5LDEuOTI1LDAuNDM5YzAuOTAzLDAsMS41NDgtMC4xNSwxLjkzNy0wLjQ1MWMwLjM5LTAuMzAxLDAuNTg0LTAuNzgzLDAuNTg0LTEuNDQ3YzAtMC41OTgtMC4yMTktMS4wNDMtMC42NTMtMS4zMzZzLTEuMDYyLTAuNDM5LTEuODc4LTAuNDM5Yy0wLjgzNiwwLTEuNDU5LDAuMTQ2LTEuODY5LDAuNDM5UzMuNDY5LDIxLjQxOCwzLjQ2OSwyMi4wMzJ6Ii8+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTkuMTgzLDEzLjU3N0w4LjI2OSwxMy43N3YwLjA0N2MwLjQwMSwwLjMyLDAuNjc0LDAuNjQsMC44MTYsMC45NThzMC4yMTQsMC43MTYsMC4yMTQsMS4xOTJjMCwwLjYzNy0wLjE2NCwxLjEzNi0wLjQ5MSwxLjQ5N2MtMC4zMjgsMC4zNjEtMC43OTUsMC41NDItMS40LDAuNTQyYy0xLjI5NywwLTEuOTc3LTEuMDM3LTIuMDM5LTMuMTExbC0wLjAzNS0xLjA5SDQuOTM0Yy0wLjUwNCwwLTAuODc2LDAuMTA4LTEuMTE2LDAuMzI1Yy0wLjI0LDAuMjE3LTAuMzYsMC41NjMtMC4zNiwxLjA0YzAsMC41MzUsMC4xNjQsMS4xNDEsMC40OTIsMS44MTZsLTAuNzQ0LDAuMjk5Yy0wLjE3Mi0wLjMxNi0wLjMwNy0wLjY2My0wLjQwNC0xLjA0Yy0wLjA5Ny0wLjM3Ny0wLjE0Ni0wLjc1NS0wLjE0Ni0xLjEzNGMwLTAuNzY2LDAuMTctMS4zMzMsMC41MS0xLjcwMmMwLjM0LTAuMzY5LDAuODg1LTAuNTU0LDEuNjM1LTAuNTU0aDQuMzg0djAuNzIySDkuMTgzeiBNOC40OTYsMTUuNzc0YzAtMC42MDUtMC4xNjYtMS4wODEtMC40OTgtMS40MjdjLTAuMzMyLTAuMzQ2LTAuNzk3LTAuNTE5LTEuMzk2LTAuNTE5aC0wLjU4bDAuMDQxLDAuOTczYzAuMDI3LDAuNzczLDAuMTQ3LDEuMzMxLDAuMzYsMS42NzNjMC4yMTQsMC4zNDIsMC41NDQsMC41MTMsMC45OTMsMC41MTNjMC4zNTIsMCwwLjYxOS0wLjEwNiwwLjgwMy0wLjMxOVM4LjQ5NiwxNi4xNTcsOC40OTYsMTUuNzc0eiIvPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik05LjI5OSw4LjI4NWMwLDAuOTMtMC4yODYsMS42NDktMC44NTgsMi4xNTljLTAuNTcxLDAuNTEtMS4zODEsMC43NjUtMi40MjgsMC43NjVjLTEuMDc1LDAtMS45MDUtMC4yNTktMi40OTEtMC43NzZTMi42NDMsOS4xNzgsMi42NDMsOC4yMjFjMC0wLjMwOSwwLjAzMy0wLjYxNywwLjEtMC45MjZDMi44MSw2Ljk4NiwyLjg4OCw2Ljc0NCwyLjk3Nyw2LjU2OGwwLjgyNiwwLjI5OUMzLjcxNyw3LjA4MiwzLjY0Niw3LjMxNiwzLjU4OSw3LjU3QzMuNTMyLDcuODI0LDMuNTA0LDguMDQ5LDMuNTA0LDguMjQ0YzAsMS4zMDUsMC44MzIsMS45NTcsMi40OTYsMS45NTdjMC43ODksMCwxLjM5Ni0wLjE1OSwxLjgxNS0wLjQ3OGMwLjQyMi0wLjMxOSwwLjYzNC0wLjc5LDAuNjM0LTEuNDE1YzAtMC41MzUtMC4xMTUtMS4wODQtMC4zNDctMS42NDZoMC44NjFDOS4xODgsNy4wOTIsOS4yOTksNy42MzMsOS4yOTksOC4yODV6Ii8+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTUuODk2LDQuMTc4QzUuNjU2LDQuMDEsNS4zNDQsMy43NTQsNC45NTcsMy40MUwyLjc2LDEuMzM2VjAuMTgybDIuNzM2LDIuNjAyTDkuMTgzLDB2MS4xNzhMNi4xNDYsMy40NDVsMC42MzMsMC43MzJoMi40MDJ2MC45NjFIMC4wNjR2LTAuOTZoNC44MzRjMC4yMTUsMCwwLjU0NiwwLjAxNiwwLjk5NiwwLjA0N1Y0LjE3OEg1Ljg5NnoiLz48L2c+PC9zdmc+"
            alt="Feedback"
            title="Feedback Button"
            height="70px"
          />
        </a>
      </div>
    </>
  );
}

import { useState, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../../context/Auth";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import cookie from "react-cookies"
function ReviewForm() {
  const Api = "https://craft-service.herokuapp.com";
  const token = cookie.load("token");
  const [values, setValues] = useState({});
  const context = useContext(LoginContext);
  const [show, setShow] = useState(false);
  const list=cookie.load("list")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = list.id;
    let reqBody = {
      name: values.name,
      message: values.message,
      date: values.date,
      rate: values.rate,
    };

    await axios
      .post(`${Api}/worker/reviews/${id}`, reqBody, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((respon) => {
        console.log(respon.data);
        context.setList2(respon.data);
        cookie.save("list2",respon.data)
        e.target.reset();
        
      });
      Swal.fire({
        title: 'Thank You',
        width: 600,
        height:400,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        showConfirmButton: false,
        timer: 1200
      })
      setShow(false)
    
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Rate this worker
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="name"
              name="name"
              onChange={handleChange}
              className="mt-3"
            />
            <Form.Control
              type="range"
              name="rate"
              min="0"
              max="5"
              placeholder="rate"
              onChange={handleChange}
              className="mt-3"
            />
            <Form.Control
              type="datetime-local"
              name="date"
              onChange={handleChange}
              className="mt-3"
            />
            <Form.Control
              as="textarea"
              name="message"
              rows="4"
              cols="50"
              onChange={handleChange}
              placeholder="message"
              className="mt-3"
            />

            <Button type="submit">upload</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ReviewForm;

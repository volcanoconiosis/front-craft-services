import axios from "axios";
import { useState } from "react";
import cookie from "react-cookies";
import { Form,Button } from "react-bootstrap";
import Swal from "sweetalert2";
function ToolsForm(props) {
  const Api ="https://craft-service.herokuapp.com"
  const [values, setValues] = useState({});
  const [imges, setImg] = useState({});

  const handleImg = async (e) => {
    setImg(e.target.files);
  };
  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = cookie.load("token");
    const body = new FormData();
    for (const file of Object.entries(imges)) {
      file.forEach((el) => {
        if (typeof el === "object") {
          body.append("images", el);
        }
      });
    }
    console.log("----------------", body);

    let arrayOfFiles = await axios({
      method: "post",
      url: `${Api}/uploadImg`,
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    });
    let pathImges = arrayOfFiles.data.map((el) => {
      return el.path;
    });

    let reqBody = {
      title: values.title,
      description: values.description,
      imges: pathImges,
    };

    let res = await axios.post(`${Api}/worker/tools`, reqBody, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    props.setWorkerList(res.data);
    console.log(res);
    e.target.reset();
    props.setShow(false)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'your item has been Upload',
      showConfirmButton: false,
      timer: 1500
    })
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          name="uploadedImages"
          onChange={handleImg}
        />

        <Form.Control
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
          className="mt-3"
        />
        <Form.Control as="textarea"
          name="description"
          rows="4"
          cols="50"
          onChange={handleChange}
          placeholder="description"
          className="mt-3"
        />
        <Button type="submit" className="mt-3"  style={{float:"right"}}>upload</Button>
      </form>
    </div>
  );
}

export default ToolsForm;

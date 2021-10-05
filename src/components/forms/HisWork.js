import axios from "axios";
import { useState } from "react";
import cookie from "react-cookies";
import { Form,Button } from "react-bootstrap";

function HisWork(props) {
  const Api = "https://craft-service.herokuapp.com"
  const [values, setValues] = useState({});
  const [imges, setImg] = useState({});
  const token = cookie.load("token");

  const handleImg = async (e) => {
    setImg(e.target.files);
  };
  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
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
      date: values.date,
      location: values.location,
      imges: pathImges,
    };

    let res = await axios.post(`${Api}/worker/hiswork`, reqBody, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    props.setWorkerList(res.data);
    console.log("from his work",res);
    e.target.reset()
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
        <Form.Control
          type="text"
          placeholder="location"
          name="location"
          onChange={handleChange}
          className="mt-3"
        />
        <Form.Control
          name="description"
          rows="4"
          cols="50"
          onChange={handleChange}
          className="mt-3"
          placeholder="description"
        />
        <Form.Control
          type="datetime-local"
          name="date"
          onChange={handleChange}
          className="mt-3"
        />
        <Button type="submit" className="mt-3" style={{float:"right"}}>upload</Button>
      </form>
    </div>
  );
}

export default HisWork;

import axios from "axios";
import { useState } from "react";
import cookie from "react-cookies";

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
      <h2>for adding to his work</h2>
      <form onSubmit={handleSubmit}>
        <label for="file">Select your image:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          name="uploadedImages"
          onChange={handleImg}
          
        />

        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="location"
          name="location"
          onChange={handleChange}
        />
        <textarea
          name="description"
          rows="4"
          cols="50"
          onChange={handleChange}
          placeholder="description"
        />
        <input
          type="datetime-local"
          name="date"
          onChange={handleChange}
        />
        <button type="submit">upload</button>
      </form>
    </div>
  );
}

export default HisWork;

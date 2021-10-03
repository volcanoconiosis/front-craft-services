import axios from "axios";
import { useState } from "react";
import cookie from "react-cookies";
/*
- form inside this component to give feedback
      - img 
      - description 
      - title 
*/
function Tools() {
    const Api =  process.env.REACT_APP_URL;
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
    console.log(res);
    e.target.reset()
  };
  return (
    <div>
      <h2>form for tools </h2>
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
        <textarea
          name="description"
          rows="4"
          cols="50"
          onChange={handleChange}
          placeholder="description"
        />
        <button type="submit">upload</button>
      </form>
    </div>
  );
}

export default Tools

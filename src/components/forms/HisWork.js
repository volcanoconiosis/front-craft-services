import axios from "axios";
import React, { useContext, useState } from "react";
import cookie from "react-cookies";

/*
- form inside this component to give feedback
      - title
      - img  
      - description 
      - date 2/2/2022
      - loction

*/
function HisWork() {

 const role = cookie.load("user");
  const Api = "https://craft-service.herokuapp.com";
  const [title, setTitle] = useState("");
  const [imges, setImg] = useState({});

  const handleImg = async (e) => {
    setImg(e.target.files);
  };
  const handleTitle = async (e) => {
    setTitle(e.target.value);
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

    let arr = await axios({
      method: "post",
      url: `${Api}/uploadImg`,
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    });

    let reqBody = {
      title: title,
      imges: arr.data,
    };
    
    if(role==="worker"){
        let res = await axios.post(`${Api}/worker/hiswork`, reqBody, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })

          console.log(res);
    }
    

    console.log(arr.data);
    
  };
  return (
    <div>
      <h2>sjjjjjjjjjjjjjjjjaskd</h2>
      <form onSubmit={handleSubmit}>
        <label for="file">Select your image:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          name="uploadedImages"
          id="file"
          onChange={handleImg}
        />
        <span class="hint">Supported files: jpg, jpeg, png.</span>
        <input type="text" placeholder="title" onChange={handleTitle} />
        <button type="submit">upload</button>
      </form>
    </div>
  );
}

export default HisWork;

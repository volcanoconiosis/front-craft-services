import axios from "axios";
import { useState } from "react";
import cookie from "react-cookies";

function Test() {
  const Api =  process.env.REACT_APP_URL;
  const [imges, setImg] = useState({});
  const token = cookie.load("token");
  const role = cookie.load("user");
  const handleImg = async (e) => {
    setImg(e.target.files);
  };
  console.log('imges;;;;;;;;;;;;;;;;;;;',typeof imges);
  
  const handleSubmit = async (e) => {
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
    let pathImges = filePic.data
    

    let reqBody = {
        profilePicture: pathImges
    };
    if(role==='user'){

        let res = await axios.put(`${Api}/client/updateany`, reqBody, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          console.log(res);
    }else if(role==='worker'){
        let res = await axios.put(`${Api}/worker/updateany`, reqBody, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          console.log(res);
    }
    
  };
  return (
    <div>
      <h2>for change the profile picture</h2>
      <form onSubmit={handleSubmit}>
        <label for="file">Select your image:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          name="uploadedImages"
          onChange={handleImg}
        />

        
        <button type="submit">upload</button>
      </form>
    </div>
    )
}

export default Test

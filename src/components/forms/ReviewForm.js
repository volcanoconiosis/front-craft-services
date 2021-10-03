import {useState,useContext} from "react";
import axios from "axios";
import cookie from "react-cookies";
import { LoginContext } from "../../context/Auth";
function ReviewForm() {
  const Api = "https://craft-service.herokuapp.com"
  const token = cookie.load("token");
  const [values, setValues] = useState({});
  const context = useContext(LoginContext);

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   let id =context.list.id
    let reqBody = {
      name: values.name,
      message: values.message,
      date: values.date,
      rate: values.rate,
    };

   await axios.post(`${Api}/worker/reviews/${id}`, reqBody, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(respon=>{
      console.log(respon.data);
      context.setList2(respon.data)
      e.target.reset()
    })
    
    
    
  };
  return (
    <div>
      <h2>form for review </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="range"
          name="rate"
          min="0"
          max="5"
          placeholder="rate"
          onChange={handleChange}
        />

        <textarea
          name="message"
          rows="4"
          cols="50"
          onChange={handleChange}
          placeholder="message"
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

export default ReviewForm;

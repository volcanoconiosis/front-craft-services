import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap/";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import "./contact.css";

function ContactUs() {
  let [values, setValues] = useState({});
  let Api =  "https://craft-service.herokuapp.com";
  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log("from contact-us comp:", values);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset(); 
    console.log("from contacut ");
    const reqBody = {
      name: values.name,
      Subject: values.Subject,

      email: values.email,
      message: values.message,
    };
    let res= await axios.post(`${Api}/support`, reqBody);
    console.log("res---------",res)
     };

  return (
   
   
   <div className="formContactUS">
 
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
                  <Button type="submit" >
                    send <MDBIcon far icon="paper-plane" className="ml-1" />
                  </Button>
                </div>
              </div>
            </form>
        
        
     
    </div>
  );
}

export default ContactUs;

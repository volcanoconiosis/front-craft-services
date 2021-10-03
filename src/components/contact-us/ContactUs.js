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
  let Api =  process.env.REACT_APP_URL;
  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log("from contact-us comp:", values);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("from contacut ");
    const reqBody = {
      name: values.name,
      Subject: values.Subject,

      email: values.email,
      message: values.message,
    };
    await axios.post(`${Api}/support`, reqBody);
    e.target.reset();
  };

  return (
   
   
   <div className="formContactUS">
     

 


      

     
        
         
            <form>
            <p className="h5 text-center mb-4">Give Us Your FeedBack</p>
              <div className="grey-text">
                <MDBInput
                  label="Your name"
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="name"
                  onChange={handleChange}
                />

                <MDBInput
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  name="email"
                  onChange={handleChange}
                />

                <MDBInput
                  label="Subject"
                  icon="tag"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
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
                  <Button type="submit" onClick={handleSubmit}>
                    send <MDBIcon far icon="paper-plane" className="ml-1" />
                  </Button>
                </div>
              </div>
            </form>
        
        
     
    </div>
  );
}

export default ContactUs;

import axios from 'axios';
import React, {useState} from 'react';
import {Form, Container, Row, Col, InputGroup, Button, FloatingLabel} from 'react-bootstrap/'

import './contact.css';


function ContactUs() {
    let [values,setValues]=useState({})
    let Api="https://craft-service.herokuapp.com"
    function handleChange(e) {
        setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
        console.log("from contact-us comp:", values);
      }
      const handleSubmit=async e=>{
        e.preventDefault();
        console.log('from contacut ')
        const reqBody={
            firstName:values.firstName,
            lastName:values.lastName,
            email:values.email,
            message:values.message
        }
        await axios.post(`${Api}/support`,reqBody)
        e.target.reset()
      }

      


    return (
        
        <div>

            {/* <h2>form for contact us </h2>
            <form onSubmit={handleSubmit}> 
            <input type="text"  name="firstName" onChange={handleChange} placeholder="firstName"/>
            <input type="text"  name="lastName" onChange={handleChange} placeholder="lastName"/>
            <input type="email" name="email" onChange={handleChange} placeholder="email"/>
            <textarea  name="message" rows="4" cols="50" onChange={handleChange} placeholder="message"/>
            <button type="submit">ok</button>

            </form> */}

    
<h2 className="textForm">Give Us FeedBack</h2>
<Container id="containar">

<Form onSubmit={handleSubmit} className="formmain">
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className='formheaders'>First name</Form.Label>
          <br/>
          <Form.Control
          required
            type="text"
            placeholder="First name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className='formheaders'>Last name</Form.Label>
          <br/>
          <Form.Control
            
            type="text"
            placeholder="Last name"
            onChange={handleChange}

            
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label className='formheaders'>Username</Form.Label>
          <InputGroup>
            <InputGroup.Text id="inputGroupPrepend">
                @</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
     
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
    <Form.Control
      as="textarea"
      placeholder="Leave a comment here"
      style={{ height: '100px' }}
      required
    />
  </FloatingLabel>
      <Button type="submit">Submit form</Button>
    </Form>


</Container>

       
        </div> 
    )
}

export default ContactUs


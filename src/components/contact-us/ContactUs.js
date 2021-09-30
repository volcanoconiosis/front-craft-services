import axios from 'axios';
import React, {useState} from 'react';
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
            <h2>form for contact us </h2>
            <form onSubmit={handleSubmit}> 
            <input type="text"  name="firstName" onChange={handleChange} placeholder="firstName"/>
            <input type="text"  name="lastName" onChange={handleChange} placeholder="lastName"/>
            <input type="email" name="email" onChange={handleChange} placeholder="email"/>
            <textarea  name="message" rows="4" cols="50" onChange={handleChange} placeholder="message"/>
            <button type="submit">ok</button>

            </form>
        </div> 
    )
}

export default ContactUs

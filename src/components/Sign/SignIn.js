import React, {useState,useContext} from 'react';
import { LoginContext } from "../../context/Auth";

function SignIn() {
    let  context=useContext(LoginContext)
	let [userName,setUserName]=useState('')
	let [password,setPassword]=useState('')

	const handleInputUser=e=>{
		setUserName(e.target.value);
	}
	const handleInputPass=e=>{
		setPassword(e.target.value);
	}
	const handlerSubmit=async e=>{
		e.preventDefault();
		// handle login function 
		await context.login(userName, password);
        e.target.reset()
    // window.location.href="/"
		
	}
  return (
	  <>
	
        <form onSubmit={handlerSubmit}>
            <input type="text"  name="name" onChange={handleInputUser} />
            <input type="password" name="password" onChange={handleInputPass}/>
           <button type="submit" > login</button>
        </form>
        

	 
  </>
  );
}

export default SignIn;
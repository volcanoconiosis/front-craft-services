// import React, {useState,useContext} from 'react';
// import { LoginContext } from "../../context/Auth";

// // dont forget we need to handle the signup for worker and user the extra stuff

// function SignUp() {
//     let  context=useContext(LoginContext)
//     let [values,setValues]=useState({})
//     function handleChange(e) {
//         setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
//         console.log("from sign comp:", values);
//       }
// 	const handlerSubmit=async e=>{
// 		e.preventDefault();
//         e.target.reset()
// 		// handle login function 
//         await context.signUp(values)
        
//     // window.location.href="/"
		
// 	}
//   return (
// 	  <>
	
//         <form onSubmit={handlerSubmit}>
            
//             <input type="text"  name="username" onChange={handleChange} placeholder="username" />
//             <input type="text"  name="firstName" onChange={handleChange} placeholder="firstName"/>
//             <input type="text"  name="lastName" onChange={handleChange} placeholder="lastName"/>
//             <input type="password" name="password" onChange={handleChange} placeholder="password"/>
//             <input type="text" name="phone" onChange={handleChange} placeholder="phone"/>
//             <input type="email" name="email" onChange={handleChange} placeholder="email"/>
//             <input type="text" name="role" onChange={handleChange} placeholder="role"/>
//             <input type="text" name="location" onChange={handleChange} placeholder="location"/>
//             <input type="text" name="store" onChange={handleChange} placeholder="store"/>
//             <select name="workType" onChange={handleChange} placeholder="workType">
//                 <option value="moserje" name="moserje">moserje</option>
//                 <option value="khrabje" name="khrabje"> khrabje</option>
//                 <option value="bleet" name="bleet">bleet</option>
//                 <option value="dheen" name="dheen">dheen</option>

//             </select>


//            <button type="submit" > sign-up</button>
//         </form>

	 
//   </>
//   );
// }

// export default SignUp;
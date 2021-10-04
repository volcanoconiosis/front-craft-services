import React, { useState, useContext } from "react";
import { LoginContext } from "../../context/Auth";
import "./sing.css";
import img from "./img3-removebg-preview.png";
function SignIn() {
  let context = useContext(LoginContext);
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [className, setClassName] = useState("container");
  let [values, setValues] = useState({});

  const handleChangeSignUp = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log("from sign comp:", values);
  };
  const handleInputUser = (e) => {
    setUserName(e.target.value);
  };
  const handleInputPass = (e) => {
    setPassword(e.target.value);
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    // handle login function
    await context.login(userName, password);
    e.target.reset();
    // window.location.href="/"
  };
  const handlerSubmitSignUp = async (e) => {
    e.preventDefault();
    e.target.reset();
    // handle login function
    await context.signUp(values);

    // window.location.href="/"
  };
  return (
    <>
      <div className="SignIn-SignUp">
        <div className={className}>
          <div className="forms-container">
            <div className="signin-signup">
              <form className="sign-in-form" onSubmit={handlerSubmit}>
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    name="name"
                    onChange={handleInputUser}
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputPass}
                    required
                  />
                </div>
                <input type="submit" value="Login" className="btn solid" />
            
              </form>
              
              
              <form className="sign-up-form" onSubmit={handlerSubmitSignUp}>
                <section style={{margin:"15px 15px 0 0"}}>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChangeSignUp}
                    required
                  />
                </div>
                
                <div className="input-field">
                  <i className="fas fa-user-edit"></i>
                  <input
                    type="text"
                    placeholder="Firstname"
                    name="firstName"
                    onChange={handleChangeSignUp}
                    required
                  />
                </div>
                
                <div className="input-field">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChangeSignUp}
                    required
                  />
                </div>
                <div className="input-field" >
                  <i className="fas fa-calendar-check"></i>
                  <select
                    type="text"
                    placeholder="Role"
                    name="role"
                    className="select-signin"
                    onChange={handleChangeSignUp}
                    required
                  >
                    <option
                      placeholder="Role"
                      value="user"
                      name="role"
                      className="select-signin"
                    >
                      user
                    </option>
                    <option
                      value="worker"
                      className="select-signin"
                      name="role"
                    >
                      worker
                    </option>
                  </select>
                </div>

                <div className="input-field">
                  <i className="fas fa-wrench"></i>
                  <select
                    type="text"
                    placeholder="workType"
                    name="workType"
                    className="select-signin"
                    onChange={handleChangeSignUp}
                    
                  >
                    <option value="Carpenter" className="select-signin">
                    Carpenter
                    </option>
                    <option value="Plumber" className="select-signin">
                    Plumber
                    </option>
                    <option value="Electrician" className="select-signin">
                    Electrician
                    </option>
                    <option value="Tile-worker" className="select-signin">
                    Tile-worker
                    </option>
                    <option value="Blacksmith" className="select-signin">
                    Blacksmith
                    </option>
                  </select>
                </div>
                </section>
                <section style={{margin:"15px 15px 0 0"}}>

                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChangeSignUp}
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-user-edit"></i>
                  <input
                    type="text"
                    placeholder="Lastname"
                    name="lastName"
                    onChange={handleChangeSignUp}
                    required
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-mobile-alt"></i>
                  <input
                    type="text"
                    placeholder="phone"
                    name="phone"
                    onChange={handleChangeSignUp}
                    required
                  />
                </div>    
               
                <div className="input-field" style={{marginBottom:"30px"}}>
                  <i className="fas fa-map-marker-alt"></i>
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    onChange={handleChangeSignUp}
                    required
                  />
                </div>
                
               
                
                <input type="submit" className="btn" value="Sign up" />
                </section>
            
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here ?</h3>
                <p style={{fontSize:"20px"}}>
                 Sign Up Now To Becoume On Of Us 
                </p>
                
                <button
                  className="btn transparent"
                  id="sign-up-btn"
                  onClick={() => {
                    setClassName("container sign-up-mode");
                  }}
                >
                  Sign up
                </button>
              </div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Piratey_transparent_background.svg/383px-Piratey_transparent_background.svg.png"
                className="image"
                alt=""
              />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us ?</h3>
                <p style={{fontSize:"20px"}}>
                 Sign In To Access Data  
                </p>
                <button
                  className="btn transparent"
                  id="sign-in-btn"
                  onClick={() => {
                    setClassName("container");
                  }}
                >
                  Sign in
                </button>
              </div>
              <img src={img} className="image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;

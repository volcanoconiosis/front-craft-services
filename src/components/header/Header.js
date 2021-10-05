import React, { useState,useEffect, useContext } from "react";
import { Container, Nav, Navbar ,Button} from "react-bootstrap";
import cookie from "react-cookies"
import {LoginContext} from "../../context/Auth"
import img from "./logo6-removebg-preview.png"
function Header() {
  const token=cookie.load("token")
  const context=useContext(LoginContext)
  const [status,setState]=useState("top")
  let listener=null;

async function handleLogOut(){
 await context.logout()

}

// useEffect(() => {
//   listener = document.addEventListener("scroll", (e) => {
//     var scrolled = document.scrollingElement.scrollTop;
//     if (scrolled >= 120) {
//       if (status !== "") {
//         setState(" ");
//       }
//     } else {
//       if (status !== "top") {
//         setState("top");
//       }
//     }
//   });
// },[status,listener])
//  useEffect(() => {
//   document.removeEventListener("scroll", listener);
//  },[listener])
 
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
     
        fixed="top"
        bg="primary" variant="dark"
        // style={{
        //   backgroundColor:
        //     status === "top"
        //       ? "rgba(255, 255, 255, 0.0)"
        //       : "rgba(255, 255, 255, 1)",
        //   boxShadow:
        //     status === "top"
        //       ? "0 8px 8px rgba(0, 0, 0, 0)"
        //       : "0 8px 8px rgba(0, 0, 0, 0.308)",
        //   transition: "1s",
        // }}
      >
        <Container>
          <Navbar.Brand href="/"><img src={img} alt="logo home" style={{width:"15%" }} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/aboutus">About-Us</Nav.Link>
              {token?
              <>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/" onClick={handleLogOut}>Sign-Out</Nav.Link>
              </>
              : <Nav.Link eventKey={2} href="/sign">
                Sign-In
              </Nav.Link>
              }
              
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

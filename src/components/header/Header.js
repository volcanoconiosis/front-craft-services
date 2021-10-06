import React, { Component } from "react";
import cookie from "react-cookies"
import {LoginContext} from "../../context/Auth"
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Header.css"
import img from "./logo6-removebg-preview.png"
class Header extends Component {
  constructor(props) {
    super(props);
    this.listener = null;
    this.token=cookie.load("token");
    this.state = {
      status: "top",
    
    };
  }
 
  static contextType = LoginContext;
  async handleLogOut(){
    await this.context.logout()
   
   }
  componentDidMount() {
    this.listener = document.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 120) {
        if (this.state.status !== "") {
          this.setState({ status: "" });
        }
      } else {
        if (this.state.status !== "top") {
          this.setState({ status: "top" });
        }
      }
    });
  }
  componentDidUpdate() {
    document.removeEventListener("scroll", this.listener);
  }
  render() {
    return (
      <>
        <Navbar
          fixed="top"
          variant="dark"
          className="navbar-header"
          id="mynav"
          style={{
            backgroundColor:
              this.state.status === "top"
                ? "rgba(255, 255, 255, 0.0)"
                : "#2eb9ed",
                color:this.state.status === "top"
                ? "black"
                : "white",
            boxShadow:
              this.state.status === "top"
                ? "0 8px 8px rgba(0, 0, 0, 0)"
                : "0 8px 8px rgba(0, 0, 0, 0.308)",
            transition: "1s",
          }}
        >
         <Container>
          <Navbar.Brand href="/"><img src={img} alt="logo home" style={{width:"15%" }} className="o2art-logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/aboutus">About-Us</Nav.Link>
              {this.token?
              <>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/" onClick={()=>{this.handleLogOut()}}>Sign-Out</Nav.Link>
              </>
              : <Nav.Link eventKey={2} href="/sign">
                Sign-In
              </Nav.Link>
              }
              
             
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;
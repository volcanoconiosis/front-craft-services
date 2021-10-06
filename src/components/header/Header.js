import React, { Component } from "react";
import cookie from "react-cookies";
import { LoginContext } from "../../context/Auth";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Header.css";
import img from "./copy_193958164.png";
import { Link, BrowserRouter } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);
    this.listener = null;
    this.token = cookie.load("token");
    this.state = {
      status: "top",
    };
  }

  static contextType = LoginContext;
  async handleLogOut() {
    await this.context.logout();
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
                : "#76C6FF",
            color: this.state.status === "top" ? "black" : "white",
            boxShadow:
              this.state.status === "top"
                ? "0 8px 4px rgba(0, 0, 0, 0.0)"
                : "0 3px 2px rgba(0, 0, 0, 0.1)",
            transition: "1s",
            textShadow:
              this.state.status === "top"
                ? "0 0 1px #003cff, 0 0 1px #003cff"
                : "0 0 1px #FFF, 0 0 1px #FFF",
          }}
        >
          <BrowserRouter>
            <Container>
              <Navbar.Brand href="/">
                
                <img
                  src={img}
                  alt="logo home"
                  style={{ width: "10%" }}
                  className="o2art-logo"
                />
                
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  <Nav.Link href="/">
                    Home
                    <Link to="/"></Link>
                  </Nav.Link>
                  <Nav.Link href="/services">
                    Services
                    <Link to="/services"></Link>
                  </Nav.Link>
                  <Nav.Link href="/aboutus">
                    About-Us
                    <Link to="/aboutus"></Link>
                  </Nav.Link>
                  {this.token ? (
                    <>
                      <Nav.Link href="/profile">
                        Profile
                        <Link to="/profile"></Link>
                      </Nav.Link>
                      <Nav.Link
                        href="/"
                        onClick={() => {
                          this.handleLogOut();
                        }}
                      >
                        Sign-Out
                        <Link to="/"></Link>
                      </Nav.Link>
                    </>
                  ) : (
                    <Nav.Link eventKey={2} href="/sign">
                      Sign-In
                      <Link to="/sign"></Link>
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </BrowserRouter>
        </Navbar>
      </>
    );
  }
}

export default Header;

import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import img from "../header/copy_193958164.png"
// 
import './footer.css'
import{
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaGithubSquare
} from "react-icons/fa"
function Footer() {
  /* 
        ::: links ::: 
        - contact-us 
        - about-us 
        - information 
        - quick links
        
        
    
    
    */
  return (
    <div>
      <div class="d-flex flex-column">
        <footer class="footer-footer">
          <Navbar collapseOnSelect expand="lg" className="foter-nav" bg="dark" variant="dark" >
            <Container>
              <Navbar.Brand href="/"><img src={img} alt="logo home" style={{ width: "15%" }} className="o2art-logo" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link eventKey={2} href="https://www.facebook.com/" target="_blank">  <FaFacebookSquare className="icons_footer"/></Nav.Link>
                  <Nav.Link eventKey={2} href="https://www.instagram.com/" target="_blank">  <FaInstagramSquare className="icons_footer"/></Nav.Link>
                  <Nav.Link eventKey={2} href="https://www.twitter.com/" target="_blank">  <FaTwitterSquare className="icons_footer"/></Nav.Link>
                  <Nav.Link eventKey={2} href="https://github.com/volcanoconiosis/front-craft-services/" target="_blank"> <FaGithubSquare className="icons_footer"/></Nav.Link>
                </Nav>
                <Nav >
                  <Nav.Link href="#pricing">&copy;2021 craft services. All Rigths Reserved</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </footer>
      </div>
    </div>
  );
}

export default Footer;

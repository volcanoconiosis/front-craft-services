import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
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
        <footer class="footer">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">(logo)CRAFT</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#features">Features</Nav.Link>
                  <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="#deets">More deets</Nav.Link>
                  <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                  </Nav.Link>
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

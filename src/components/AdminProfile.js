import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import "./ibrahem.css";
// import images
import personalImg from "./ryan.jpg";
import PersonalAdmin from "./profiles/admin/PersonalAdmin";
import TheClients from "./profiles/admin/TheClients";
import TheWokers from "./profiles/admin/TheWokers";
import TheContact from "./profiles/admin/TheContact";

function AdminProfile() {
  const [iconPills, setIconPills] = useState("1");
  return (
    <>
      {/* ========== top section ============== */}
      <section className="profile-top-section">
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <div class="profile-top-img">
                <img src={personalImg} />
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <div className="profile-top-name">
                <h1>Admin</h1>
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <div className="profile-top-jop">
                <h3>Admin</h3>
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </section>
      {/* ========== end top section ============== */}

      {/* ========== about section ============== */}

      <section className="profile-about-section">
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <div className="profile-top-about">
                <h3>About</h3>
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <div className="profile-top-about">
                <p>
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc
                  pulvinar aliquam aliquam ullamcorper aliquet nec nostra
                  bibendum ad. Tempor tempus maecenas, nisl adipiscing felis
                  taciti. Penatibus leo convallis dictumst ex sem litora sed
                  ullamcorper blandit. Luctus nulla rhoncus auctor nibh massa
                  enim consectetur facilisi. Phasellus diam ad dolor donec
                  dapibus amet? Amet urna consequat tincidunt quis magna
                  viverra.
                </p>
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </section>
      {/* ========== end about section ============== */}

      {/* ========== contant section ============== */}
      <section className="profile-contant-section">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={2} className="profile-contant-left">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="T1">Info</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T2">The Clients</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T3">The Workers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T4">Feed Back</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={1}></Col>
            <Col sm={9} className="profile-contant-right">
              <Tab.Content>
                <Tab.Pane eventKey="T1">
                  <PersonalAdmin/>
                </Tab.Pane>
                <Tab.Pane eventKey="T2">
                  <TheClients />
                </Tab.Pane>
                <Tab.Pane eventKey="T3">
                  <TheWokers/>
                </Tab.Pane>
                <Tab.Pane eventKey="T4">
                  <TheContact />
                </Tab.Pane>
               
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </section>
    </>
  );
}

export default AdminProfile;

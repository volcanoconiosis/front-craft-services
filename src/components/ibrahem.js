import React, { useState } from "react";
import { Container, Row, Col, Tab ,Nav} from "react-bootstrap";
import "./ibrahem.css";


// import images
import personalImg from "./ryan.jpg";
import { LoremIpsum } from "react-lorem-ipsum";
function ibrahem() {
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
                <h1>Ibrahem Alomari</h1>
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <div className="profile-top-jop">
                <h3>Mosarjy</h3>
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
                  <Nav.Link eventKey="T2">Favorite worker</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T3">Favorite Image</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T4">recently</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T5">schedule Work</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T6">his Work</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T7">offers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T8">tools</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T9">reviews</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T10">His work</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col  sm={1}></Col>
            <Col sm={9} className="profile-contant-right">
              <Tab.Content>
                <Tab.Pane eventKey="T1">
                  ddd
                </Tab.Pane>
                <Tab.Pane eventKey="T2">
                  ssss
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </section>
    </>
  );
}

export default ibrahem;
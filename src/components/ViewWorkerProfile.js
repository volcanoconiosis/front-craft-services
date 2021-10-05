import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import "./profiles/worker/ibrahem.css";

// import images
import personalImg from "./profiles/worker/ryan.jpg";
import PersonalInformation from "./profiles/workerProfile/PersonalInformation";
import WorkerWork from "./profiles/workerProfile/WorkerWork";
import WorkerTools from "./profiles/workerProfile/WorkerTools";
import WorkerReview from "./profiles/workerProfile/WorkerReview";
import WorkerOffers from "./profiles/workerProfile/WorkerOffers";
import WorkerSec from "./profiles/workerProfile/WorkerSec";

function ViewWorkerProfile() {
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
                <h1>Worker Profile</h1>
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <div className="profile-top-jop">
                <h3>WorkType</h3>
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
                  <Nav.Link eventKey="T2">His Work</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T3">Tools</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T4">Reviews</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T5">Offers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T6">Schedule Work</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={1}></Col>
            <Col sm={9} className="profile-contant-right">
              <Tab.Content>
                <Tab.Pane eventKey="T1">
                  <PersonalInformation/>
                </Tab.Pane>
                <Tab.Pane eventKey="T2">
                  <WorkerWork/>
                </Tab.Pane>
                <Tab.Pane eventKey="T3">
                 <WorkerTools/>
                </Tab.Pane>
                <Tab.Pane eventKey="T4">
                  <WorkerReview/>
                </Tab.Pane>
                <Tab.Pane eventKey="T5">
                  <WorkerOffers/>
                </Tab.Pane>
                <Tab.Pane eventKey="T6">
                 <WorkerSec/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </section>
    </>
  );
}

export default ViewWorkerProfile;

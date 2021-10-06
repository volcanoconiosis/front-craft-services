import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import "./profiles/worker/ibrahem.css";

// import images
import Chat from "./chats/Chats"
import cookie from "react-cookies"
import PersonalInformation from "./profiles/workerProfile/PersonalInformation";
import WorkerWork from "./profiles/workerProfile/WorkerWork";
import WorkerTools from "./profiles/workerProfile/WorkerTools";
import WorkerReview from "./profiles/workerProfile/WorkerReview";
import WorkerOffers from "./profiles/workerProfile/WorkerOffers";
import WorkerSec from "./profiles/workerProfile/WorkerSec";


function ViewWorkerProfile() {
  // /client/recently
 
  const role=cookie.load("user")
  const Api = "https://craft-service.herokuapp.com";

  const list = cookie.load("list");

  return (
    <>
    <svg
            id="wave"
            style={{transform:"rotate(180deg)",transition:"0.3s"}}
            // style="transform:rotate(180deg); transition: 0.3s"
            viewBox="0 0 1440 490"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="profile-svg"
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop stop-color="rgba(255, 255, 255, 1)" offset="0%"></stop>
                <stop
                  stop-color="rgba(212.168, 212.168, 212.168, 1)"
                  offset="100%"
                ></stop>
              </linearGradient>
            </defs>
            <path
            style={{transform:"translate(0, 0px)",opacity:"1"}}
              // style="transform:translate(0, 0px); opacity:1"
              fill="url(#sw-gradient-0)"
              d="M0,147L120,163.3C240,180,480,212,720,187.8C960,163,1200,82,1440,89.8C1680,98,1920,196,2160,245C2400,294,2640,294,2880,269.5C3120,245,3360,196,3600,212.3C3840,229,4080,310,4320,359.3C4560,408,4800,425,5040,424.7C5280,425,5520,408,5760,383.8C6000,359,6240,327,6480,277.7C6720,229,6960,163,7200,138.8C7440,114,7680,131,7920,163.3C8160,196,8400,245,8640,277.7C8880,310,9120,327,9360,310.3C9600,294,9840,245,10080,204.2C10320,163,10560,131,10800,171.5C11040,212,11280,327,11520,367.5C11760,408,12000,376,12240,359.3C12480,343,12720,343,12960,318.5C13200,294,13440,245,13680,245C13920,245,14160,294,14400,318.5C14640,343,14880,343,15120,285.8C15360,229,15600,114,15840,81.7C16080,49,16320,98,16560,130.7C16800,163,17040,180,17160,187.8L17280,196L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
            ></path>
          </svg>
      {/* ========== top section ============== */}
      <section className="profile-top-section mb-5">
        <Container>
          <Row>
            <Col xs={1}>
              <div class="profile-top-img">
              {list.profilePicture && list.profilePicture.includes("upload") ? (
            <img
              src={`${Api}/${list.profilePicture}`}
              style={{ width: "11.1rem", height: "10rem", borderRadius: "50%" }}
            />
          ) : (
            <img src={list.profilePicture} />
          )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6} className="profile-top-identity">
              <div className="profile-top-name">
                <h1>{list.firstName} {list.lastName}</h1>
              </div>
              <div className="profile-top-jop">
                <h3>{list.workType}</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========== end top section ============== */}

      {/* ========== about section ============== */}

      
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
                {role==="user"?<Nav.Item>
                  <Nav.Link eventKey="T7" >Contact</Nav.Link>
                </Nav.Item>:""}
                
                <Nav.Item>
                  <Nav.Link eventKey="T5">Offers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="T6">Schedule Work</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
  
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
                {role==="user"?
                <>
                <Tab.Pane eventKey="T7">
                  <Chat/>
                </Tab.Pane>
                </>:""}
                
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

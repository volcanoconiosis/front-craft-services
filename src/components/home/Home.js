import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Container, Row, Button } from "react-bootstrap";
import "./home.css";
import toolsPic from "./tools.png";
import mapPic from "./map.png";
import {
  FcSearch,
  FcEngineering,
  FcPortraitMode,
  FcAdvertising,
  FcApproval,
  FcComments,
  FcIdea,
  FcInspection,
  FcPositiveDynamic,
  FcCapacitor,
  FcDocument,
  FcFilledFilter,
  FcFlashOn,
  FcServices,
  FcSupport,
} from "react-icons/fc";

function Home() {
  /* 

     ::: main :::
    - talk about the site 
    - why to use it 
    - show the fetures 
    - how its work 
    - how can you use it 


    ::: functions ::: 
    - useEffect async 
      - get all workers ("/getAllWorkers") personal information ... workType
    */

  useEffect(() => {
    let canvas = document.querySelector("canvas");

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let c = canvas.getContext("2d");

    function Circle(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;

      this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "rgba(192,192,192,0.3)";
        c.stroke();

        c.fillStyle = color;
        c.fill();
      };

      this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      };
    }

    let circleArray = [];

    for (let i = 0; i < 1000; i++) {
      let radius = Math.random() * 5;
      let x = Math.random() * (innerWidth - radius * -20) + radius;
      let y = Math.random() * (innerHeight - radius * -2000) + radius;
      let dx = Math.random() - 0.5;
      let dy = Math.random() - 0.5;
      //Random color
      let myArray = ["#c7d7ed", "#f0c9d7", "#edddb9", "#dcf7e4", "#d7fcfb"];
      let color = myArray[Math.floor(Math.random() * myArray.length)];
      circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }

    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, innerWidth, canvas.height);
      circleArray.forEach(function (elem) {
        elem.update();
      });
    }

    animate();
  });
  return (
    <div>
      <div className="home">
      <canvas></canvas>
        {/* // =========== top section =========== */}
        <section className="home-top-section">
          <Container>
            <Row>
              <Col>
                <h1 className="home-title home-center-text">
                  Maintaining your property just got easier
                </h1>
                <p className="home--para">
                  Maintaining your property just got easier Wherever our
                  services are available, with the most skilled industrialists
                  and workers, choose the worker only to come to you at
                  lightning speed, whether maintenance of electricity, pipes,
                  construction, water flow, furniture ... etc., you will find it
                  here and with many other options,{" "}
                  <a href="">
                    <Button variant="primary">register now</Button>
                  </a>{" "}
                  and start working.
                </p>
              </Col>
              <Col>
                <img src={toolsPic} alt class="bounce-top" />
              </Col>
            </Row>
          </Container>
        </section>

        {/* // =========== End top section =========== */}

        {/* // =========== needs section =========== */}
        <section
          className="home-needs-section"
          style={{
            backgroundImage: `url(${mapPic})`,
            backgroundAttachment: "fixed",
          }}
        >
          <Container>
            <Row>
              <p className="home-section-title">what you needs</p>
            </Row>
            <Row>
              <Col>
                <Card className="home-needs-card">
                  <Card.Header className="home-needs-card-header">
                    <div className="home-needs-icon icon1">
                      <FcSearch />
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Search</Card.Title>
                    <Card.Text>
                      Search for what you want and you will find it immediately,
                      choose the worker and add it to the list of workers
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="home-needs-card">
                  <Card.Header className="home-needs-card-header">
                    <div className="home-needs-icon icon2">
                      <FcEngineering />
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Maintenance</Card.Title>
                    <Card.Text>
                      Confirm the type of work you want to help with and choose
                      the most skilled worker
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="home-needs-card">
                  <Card.Header className="home-needs-card-header">
                    <div className="home-needs-icon icon3">
                      <FcPortraitMode />
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Worker </Card.Title>
                    <Card.Text>
                      Contacted him and started and agreed with him on the
                      service request
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        {/* // =========== End-needs section =========== */}

        {/* // =========== solutions section =========== */}
        <section className="home-solutions-section">
          <Container>
            <Row>
              <p className="home-section-title">Solutions for you</p>
            </Row>
            <Row>
              <p className="home--sub-title">
                So many choices, so many workers, so many jobs, what do you do?
              </p>
            </Row>
            <Row className="mt10rem">
              <Col xs={2}>
                <div className="home-carousel">
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://img.misterworker.com/img/splash_banner_mobile.jpg"
                        alt="First slide"
                      />
                      {/* <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                      </p>
                    </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://img.misterworker.com/img/splash_banner_mobile.jpg"
                        alt="Second slide"
                      />
                      {/* 
                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://img.misterworker.com/img/splash_banner_mobile.jpg"
                        alt="Third slide"
                      />

                      {/* <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                      </p>
                    </Carousel.Caption> */}
                    </Carousel.Item>
                  </Carousel>
                </div>
              </Col>
              <Col className="home-solutions-list">
                <Row>
                  <Col>
                    <div className="home-solutions-icon">
                      <FcAdvertising />
                    </div>
                  </Col>
                  <Col>
                    <Row>
                      <h2 className="home--para">What New?</h2>
                      <p className="home--para">
                        Constant updating for easy access to the worker and the
                        user, and new services in all sectors, stay informed
                      </p>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className="home-solutions-icon">
                      <FcApproval />
                    </div>
                  </Col>
                  <Col>
                    <Row>
                      <h2 className="home--para">Approval</h2>
                      <p className="home--para">
                        Your data and transactions are safe with superior data
                        protection by best securty engineers
                      </p>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className="home-solutions-icon">
                      <FcComments />
                    </div>
                  </Col>
                  <Col>
                    <Row>
                      <h2 className="home--para">Commincate</h2>
                      <p className="home--para">
                        Ease of communication and many options with workers or
                        with other users
                      </p>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt10rem">
              <Col className="home-solutions-list list-2">
                <Row>
                  <Col>
                    <div className="home-solutions-icon">
                      <FcIdea />
                    </div>
                  </Col>
                  <Col>
                    <Row>
                      <h2 className="home--para">Ideas</h2>
                      <p className="home--para">
                        Creative ideas that help you choose workers and services
                        to get the best business for you
                      </p>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="home-solutions-icon">
                      <FcInspection />
                    </div>
                  </Col>
                  <Col>
                    <Row>
                      <h2 className="home--para">To-do list</h2>
                      <p className="home--para">
                        Organize your choices and services by adding to your
                        favorites for easy access again
                      </p>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className="home-solutions-icon">
                      <FcPositiveDynamic />
                    </div>
                  </Col>
                  <Col>
                    <Row>
                      <h2 className="home--para">All Good </h2>
                      <p className="home--para">
                        We assure the client that the services provided are
                        performed with credibility and honesty to achieve his
                        satisfaction
                      </p>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xs={2}>
                <div className="home-carousel-r">
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://img.misterworker.com/img/splash_banner_mobile.jpg"
                        alt="First slide"
                      />
                      {/* <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                      </p>
                    </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://img.misterworker.com/img/splash_banner_mobile.jpg"
                        alt="Second slide"
                      />

                      {/* <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="https://img.misterworker.com/img/splash_banner_mobile.jpg"
                        alt="Third slide"
                      />

                      {/* <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                      </p>
                    </Carousel.Caption> */}
                    </Carousel.Item>
                  </Carousel>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* // =========== End solutions section =========== */}

        {/* // =========== worker craft section =========== */}

        <section
          className="home-craft-section"
          style={{
            backgroundImage: `url(${mapPic})`,
            backgroundAttachment: "fixed",
          }}
        >
          <Container>
            <Row className="home-tools-icons">
              <Col>
                <div className="home-icon-item">
                  <FcCapacitor />
                </div>
              </Col>
              <Col>
                <div className="home-icon-item">
                  <FcDocument />
                </div>
              </Col>
              <Col>
                <div className="home-icon-item">
                  <FcFilledFilter />
                </div>
              </Col>
              <Col>
                <div className="home-icon-item">
                  <FcFlashOn />
                </div>
              </Col>
              <Col>
                <div className="home-icon-item">
                  <FcServices />
                </div>
              </Col>
              <Col>
                <div className="home-icon-item">
                  <FcSupport />
                </div>
              </Col>
            </Row>
            <Row>
              <p className="home-section-title">Best our skills workers</p>
            </Row>
            <Row>
              <div class="home-worker-viwe">
                <Row>
                  <Col>
                    <div
                      class="feature-card"
                      style={{ backgroundImage: `url(${toolsPic})` }}
                    >
                      <div class="feature-card-tilte"></div>
                      <div class="feature-card-deatails">
                        <i class="fa fa-bank"></i>
                        <h4>worker one</h4>
                        <p>
                          Nemo enim ipsam voluptatem quia voluptas sit
                          aspernatur aut odit aut fugit
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col></Col>
                  <Col>
                    <div
                      class="feature-card"
                      style={{ backgroundImage: `url(${toolsPic})` }}
                    >
                      <div class="feature-card-tilte"></div>
                      <div class="feature-card-deatails">
                        <i class="fa fa-bank"></i>
                        <h4>worker one</h4>
                        <p>
                          Nemo enim ipsam voluptatem quia voluptas sit
                          aspernatur aut odit aut fugit
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col></Col>
                  <Col>
                    <div
                      class="feature-card"
                      style={{ backgroundImage: `url(${toolsPic})` }}
                    >
                      <div class="feature-card-tilte"></div>
                      <div class="feature-card-deatails">
                        <i class="fa fa-bank"></i>
                        <h4>worker one</h4>
                        <p>
                          Nemo enim ipsam voluptatem quia voluptas sit
                          aspernatur aut odit aut fugit
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col></Col>
                </Row>
                <Row>
                  <Col></Col>
                  <Col>
                    <div
                      class="feature-card"
                      style={{ backgroundImage: `url(${toolsPic})` }}
                    >
                      <div class="feature-card-tilte"></div>
                      <div class="feature-card-deatails">
                        <i class="fa fa-bank"></i>
                        <h4>worker one</h4>
                        <p>
                          Nemo enim ipsam voluptatem quia voluptas sit
                          aspernatur aut odit aut fugit
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col></Col>
                  <Col>
                    <div
                      class="feature-card"
                      style={{ backgroundImage: `url(${toolsPic})` }}
                    >
                      <div class="feature-card-tilte"></div>
                      <div class="feature-card-deatails">
                        <i class="fa fa-bank"></i>
                        <h4>worker one</h4>
                        <p>
                          Nemo enim ipsam voluptatem quia voluptas sit
                          aspernatur aut odit aut fugit
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col></Col>
                  <Col>
                    <div
                      class="feature-card"
                      style={{ backgroundImage: `url(${toolsPic})` }}
                    >
                      <div class="feature-card-tilte"></div>
                      <div class="feature-card-deatails">
                        <i class="fa fa-bank"></i>
                        <h4>worker one</h4>
                        <p>
                          Nemo enim ipsam voluptatem quia voluptas sit
                          aspernatur aut odit aut fugit
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Row>
          </Container>
        </section>
        {/* // =========== End worker craft section =========== */}
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import Card from "react-bootstrap/Card";
import "./aboutUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactUs from "../contact-us/ContactUs";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function AboutUs() {
  return (
    <>
      <div className="headershow">
        <img
          className="imgheader"
          src="https://www.durgasteelgroup.com/uploaded/blog/ps16034431084106.jpg"
          alt=""
        />
        <h1> About Us </h1>

        <h2>
          {" "}
          <br></br>
          <FontAwesomeIcon icon={faFacebook} className="icon3" size="2x" />
          <FontAwesomeIcon icon={faInstagram} className="icon3" size="2x" />
          <FontAwesomeIcon icon={faTwitter} className="icon3" size="2x" />
        </h2>
        <ContactUs />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h2 id="Howweare">Who we are?</h2>
        <h5 id="how">
          We are creative developers who try to think out of the box, exactly in
          this app that would provide you a unique service, the type of this
          project will be a strange and unique have to succeed in the future.
        </h5>
      </div>
      <br />

      <div className="sideimage">
        <img
          src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/illustration.jpg"
          id="firstimg"
        />
        <img
          src="https://image.freepik.com/free-vector/builders-helmets-working-construction-site-machine-building-worker-flat-vector-illustration-engineering-development_74855-8259.jpg"
          id="secimg"
        />
      </div>

      <div className="our">
        <h2>Our vision</h2>
        <p className="p-5">
          crafts services will provide for you, craftsmen, the best one and
          normal one, about his work, his rating, and contact them, anytime and
          anywhere
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <br />

      <section>
        <div>
          <h1 className="textteam">Our Team</h1>
          <div className="cardgroup">
            <br />
            <br />
            <br />

            <Card className="card1">
              <Card.Img
                variant="top"
                src="https://media-exp1.licdn.com/dms/image/C4D03AQHg8GoF-y9CHQ/profile-displayphoto-shrink_800_800/0/1611509700916?e=1638403200&v=beta&t=jg2FtRRkWoOYBcfIWzzXxHLC5bwhxrhBcW8_znUlEQA"
                className="images1"
              />
              <Card.Body>
                <Card.Title>Munther AbdelRhman</Card.Title>
                <Card.Text>Full Stack Develpoer</Card.Text>
                <p>Electrical engineer</p>
                <a href="https://www.linkedin.com/in/munther-abdel-rahman-833814172/">
                  <img
                    className="smallimg"
                    src="https://www.pngjoy.com/pngm/381/7044985_linkedin-logo-png-linkedin-logo-png-black-transparent.png "
                    alt="LinkedIn"
                  />
                </a>
                <a href="https://github.com/muntherabdlrahman">
                  <img
                    className="smallimg"
                    src=" https://cdn.iconscout.com/icon/free/png-512/github-154-675675.png"
                    alt="GitHub"
                  />
                </a>
              </Card.Body>
            </Card>

            <Card className="card1">
              <Card.Img
                variant="top"
                src="https://media-exp1.licdn.com/dms/image/C4D03AQGjnW6XUEFGew/profile-displayphoto-shrink_800_800/0/1613042110316?e=1638403200&v=beta&t=pb-kZjY4PFBQiVELFzgSUL4BU12-wGq3DvgG1aLSN3Y"
                className="images"
              />
              <Card.Body>
                <Card.Title>Ahmad Nofal</Card.Title>
                <Card.Text>Full Stack Develpoer</Card.Text>
                <p>Mechanical engineer</p>
                <a href="https://www.linkedin.com/in/munther-abdel-rahman-833814172/">
                  <img
                    className="smallimg"
                    src="   https://www.pngjoy.com/pngm/381/7044985_linkedin-logo-png-linkedin-logo-png-black-transparent.png "
                    alt="LinkedIn"
                  />
                </a>
                <a href="https://github.com/muntherabdlrahman">
                  <img
                    className="smallimg"
                    src=" https://cdn.iconscout.com/icon/free/png-512/github-154-675675.png"
                    alt="GitHub"
                  />
                </a>
              </Card.Body>
            </Card>

            <Card className="card1">
              <Card.Img
                variant="top"
                src="https://scontent.famm6-1.fna.fbcdn.net/v/t1.6435-9/143767199_1089788088114919_2838493288402680726_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSOYhNs6UpQAX-BEK_g&tn=gshzaliIpxtizMYj&_nc_ht=scontent.famm6-1.fna&oh=48f6832720821c6cb68a49344a6cbdf2&oe=61816E7B"
                className="images1"
              />
              <Card.Body>
                <Card.Title>Ibrahem Alomari</Card.Title>
                <Card.Text>Full Stack Develpoer</Card.Text>
                <p>Computer Since</p>
                <a href="https://www.linkedin.com/in/munther-abdel-rahman-833814172/">
                  <img
                    className="smallimg"
                    src="   https://www.pngjoy.com/pngm/381/7044985_linkedin-logo-png-linkedin-logo-png-black-transparent.png "
                    alt="LinkedIn"
                  />
                </a>
                <a href="https://github.com/muntherabdlrahman">
                  <img
                    className="smallimg"
                    src=" https://cdn.iconscout.com/icon/free/png-512/github-154-675675.png"
                    alt="GitHub"
                  />
                </a>
              </Card.Body>
            </Card>
            <Card className="card1">
              <Card.Img
                variant="top"
                src="https://avatars.githubusercontent.com/u/82364624?s=400&u=7048f586e1dde6bac25bf1a18f6c03a2ace5de10&v=4"
                className="images"
              />
              <Card.Body>
                <Card.Title> Osama Momani</Card.Title>
                <Card.Text>Full Stack Develpoer</Card.Text>
                <p>Mechatronics engineer</p>
                <a href="https://www.linkedin.com/in/munther-abdel-rahman-833814172/">
                  <img
                    className="smallimg"
                    src="   https://www.pngjoy.com/pngm/381/7044985_linkedin-logo-png-linkedin-logo-png-black-transparent.png "
                    alt="LinkedIn"
                  />
                </a>
                <a href="https://github.com/muntherabdlrahman">
                  <img
                    className="smallimg"
                    src=" https://cdn.iconscout.com/icon/free/png-512/github-154-675675.png"
                    alt="GitHub"
                  />
                </a>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <ContactUs />
    </>
  );
}

export default AboutUs;

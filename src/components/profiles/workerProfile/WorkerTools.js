

import cookie from "react-cookies"
import {
  
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  
  Row,
} from "react-bootstrap";
function WorkerTools() {
  const Api = "https://craft-service.herokuapp.com";
  const list2=cookie.load("list2")

  return (
    <>
      <Container>
        {list2.tools &&
          list2.tools.map((item, indx) => {
            return (
              <>
                <Row className="mt-5 his-worke-card-container">
                  <Card key={indx} style={{ width: "15rem" }}>
                    <Row>
                      <Col>
                        <div className="card-img-contianer">
                          {item.imges &&
                            item.imges.map((el, indx) => {
                              return el.includes("images") ? (
                                <Card.Img src={`${Api}/${el}`} alt={indx} />
                              ) : (
                                <Card.Img src={el} alt={indx} />
                              );
                            })}
                        </div>
                      </Col>
                      <Col>
                        <Card.Body>
                          <ListGroup>
                            <ListGroupItem>
                              <strong>Title: </strong>
                              {item.title}
                            </ListGroupItem>
                            <ListGroupItem>
                              <strong>Description: </strong>
                              {item.description}
                            </ListGroupItem>
                          </ListGroup>
                        </Card.Body>
                      </Col>

                    </Row>
                  </Card>
                </Row>
              </>
            );
          })}
      </Container>
    </>
  );
}

export default WorkerTools;

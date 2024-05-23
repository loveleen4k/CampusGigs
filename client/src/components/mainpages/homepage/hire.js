import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Hire = () => {
  return (
    <div id="hire" style={{ margin: "2rem 1rem" }}>
      <h1 className="heading" style={{ fontSize: "260%" }}>
        Hire
      </h1>
      <div className="cards">
        <Card
          className="mb-3"
          bg="dark"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Img variant="top" src="../imgs/tutor.jpeg" />
          <Card.Body>
            <Card.Title>
              <section className="heading">Tutor</section>
            </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary" className="buttons" as={Link} to="/hire">
              Hire now!
            </Button>
          </Card.Body>
        </Card>
        <Card
          className="mb-3"
          bg="dark"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Img variant="top" src="../imgs/programmer.jpg" />
          <Card.Body>
            <Card.Title>
              <section className="heading">Programmer</section>
            </Card.Title>
            <Card.Text>
              Use Freelancing Services Such As Web Development And Other
              Skillsets.{" "}
            </Card.Text>
            <Button variant="primary" className="buttons" as={Link} to="/hire">
              Hire now!
            </Button>
          </Card.Body>
        </Card>
        <Card
          className="mb-3"
          bg="dark"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Img variant="top" src="../imgs/graphicDesigner.jpg" />
          <Card.Body>
            <Card.Title>
              <section className="heading">Design and Editing</section>
            </Card.Title>
            <Card.Text>
              Hire An Editor To Give The Final Touch To Your Content.
            </Card.Text>
            <Button variant="primary" className="buttons" as={Link} to="/hire">
              Hire now!
            </Button>
          </Card.Body>
        </Card>
        <Card
          className="mb-3"
          bg="dark"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Img variant="top" src="../imgs/accountant.jpg" />
          <Card.Body>
            <Card.Title>
              <section className="heading">Other Jobs</section>
            </Card.Title>
            <Card.Text>Hire Part Timers For Online And Offline Jobs.</Card.Text>
            <Button variant="primary" className="buttons" as={Link} to="/hire">
              Hire now!
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Hire;

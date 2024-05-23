import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Apply = () => {
  return (
    <div id="apply" style={{ margin: "2rem 1rem" }}>
      <h1 className="heading" style={{ fontSize: "260%" }}>
        Apply
      </h1>
      <div className="cards">
        <Card
          className="mb-3"
          bg="dark"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Img variant="top" src="../imgs/internship.jpg" />
          <Card.Body>
            <Card.Title>
              <section className="heading">Interships</section>
            </Card.Title>
            <Card.Text>
              Interships For Improvements In Industrial Skills.{" "}
            </Card.Text>
            <Button variant="primary" className="buttons" as={Link} to="/jobs">
              Find Jobs!
            </Button>
          </Card.Body>
        </Card>
        <Card
          className="mb-3"
          bg="dark"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Img variant="top" src="../imgs/editting.jpg" />
          <Card.Body>
            <Card.Title>
              <section className="heading">Editing</section>
            </Card.Title>
            <Card.Text>Editing Jobs For All The Creative Minds.</Card.Text>
            <Button variant="primary" className="buttons" as={Link} to="/jobs">
              Find Jobs!
            </Button>
          </Card.Body>
        </Card>
        <Card
          className="mb-3"
          bg="dark"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Img variant="top" src="../imgs/tutor1.jpg" />
          <Card.Body>
            <Card.Title>
              <section className="heading">Hands On Teacher</section>
            </Card.Title>
            <Card.Text>
              Understand A Subject Pretty Well? Apply For A Tutor
            </Card.Text>
            <Button variant="primary" className="buttons" as={Link} to="/jobs">
              Find Jobs!
            </Button>
          </Card.Body>
        </Card>
        <Card
          className="mb-3"
          bg="dark"
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Img variant="top" src="../imgs/Freelance.jpg" />
          <Card.Body>
            <Card.Title>
              <section className="heading">Freelancing</section>
            </Card.Title>
            <Card.Text>
              Find The Field You Specialize In And Start Earning.
            </Card.Text>
            <Button variant="primary" className="buttons" as={Link} to="/jobs">
              Find Jobs!
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Apply;

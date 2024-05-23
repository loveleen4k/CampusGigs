import React, { Component } from "react";
import About from "./about";
import Hire from "./hire";
import Apply from "./apply";
import styled from "styled-components";
import Button from "react-bootstrap/Button";

const Intro = styled.div`
  background-image: url(./bg/bg.jpg);
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
  align-items: center;
  color: white;
  font-size: 180%;
  padding: auto;
  display: flex;
  padding: 10%;
`;

const Home = () => {
  return (
    <>
      <Intro>
        <section>
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "200%",
              textDecoration: "underline",
              textShadow: "2px 2px 4px #000000",
            }}
          >
            CampusGigs
          </h1>
          Our Site Is Designed For Students Who Want To Get Paid For
          <br /> What They Do Best And For Customers Who Want The Best.
          <br />
          <Button href="#about" variant="outline-light">
            Know More
          </Button>
        </section>
      </Intro>
      <Hire />
      <Apply />
      <About />
    </>
  );
};

export default Home;

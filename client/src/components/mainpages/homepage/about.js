import React from "react";
import styled from "styled-components";

const Display = styled.div`
  background-color: var(--black);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0rem 5rem;
  margin-bottom: 5rem;
`;

const Logo = styled.img`
  margin-right: 3rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: auto;
  align-self: center;
  text-align: justify;
`;

const About = () => {
  return (
    <div id="about" style={{ margin: "2rem 1rem" }}>
      <h1 className="heading" style={{ fontSize: "260%" }}>
        About <span style={{ color: "white" }}>Us</span>
      </h1>
      <Display>
        <Logo src="../logo/2.png" alt="Logo" />
        <ContentWrapper>
          <p className="heading">
            Empowering Students: Discover Exciting Part-Time Opportunities and
            Expertise Exchange!
          </p>
          <p>
            Welcome to our platform designed exclusively for students seeking
            flexible earning avenues like internships, tutoring gigs,
            transcription projects, and beyond. We're your go-to hub for
            connecting with fellow students for tutoring services tailored to
            your needs and schedule. Let's unlock your potential and foster a
            vibrant community of learning and earning together!
          </p>
        </ContentWrapper>
      </Display>
    </div>
  );
};

export default About;

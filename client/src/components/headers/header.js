import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";


const Header = () => {
  const location = useLocation();
  let DropdownContent = null;
  if (location.pathname == "/") {
    DropdownContent = (
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#hire" as={Link} to={'/hire'}>Hire</NavDropdown.Item>
        <NavDropdown.Item href="#apply" as={Link} to={'/jobs'}>Apply</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/jobs">
          Jobs
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#about">About Us</NavDropdown.Item>
      </NavDropdown>
    );
  } else {
    DropdownContent = (
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item as={Link} to="/jobs">
          Jobs
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/hire">
          Hire
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/jobs">
          Apply
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="/">
          About Us
        </NavDropdown.Item>
      </NavDropdown>
    );
  }

  return (
    <Navbar
      sticky="top"
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" id="brand">
          <img
            src="/logo/1.png"
            width="45"
            height="45"
            className="d-inline-block align-top"
            alt="logo"
          />{" "}
          CampusGigs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
              <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            
            
            
            {DropdownContent}
          </Nav>
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" variant="dark" size="auto">
                  <FaSearch
                    color="var(--main-color)"
                    style={{ marginBottom: "5" }}
                  />
                </Button>
              </Col>
            </Row>
          </Form>{" "}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Header;

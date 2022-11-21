import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { BiUserCircle } from 'react-icons/bi';

export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">SpeedKart</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Container className='header-profile-icon-container'> */}
          <BiUserCircle size={30} color="white" />
          {/* <span href="#login">Mark Otto</span> */}
          {/* </Container> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

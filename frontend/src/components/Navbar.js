import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {
  Nav,
  NavItem,
  NavLink,
  Dropdown
} from 'react-bootstrap';

import './Navbar.css';


function NavbarMenu() {
  return (
    <Nav className='flex-column nav-menu'>
      <Nav.Item>
        <Nav.Link href='/'>
          <span><AiIcons.AiFillHome /></span>
          <span>Home</span>
        </Nav.Link>
      </Nav.Item>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle as={NavLink} className='dropdown'>
          <span><FaIcons.FaDatabase /></span>
          <span>Oligos</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className='dropdown-items'>
          <Dropdown.Item href='/oligos'>View list</Dropdown.Item>
          <Dropdown.Item href='/add'>Add new oligo</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item disabled>Batch submission</Dropdown.Item>
          <Dropdown.Item disabled>Sequence search</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  )
}

export default NavbarMenu;
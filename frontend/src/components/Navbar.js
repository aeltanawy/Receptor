import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to='/oligos'>View list</Link>
          <Link to='/add'>Add new oligo</Link>
          <Dropdown.Divider />
          <Link to='#' class='disabled'>Batch submission</Link>
          <Link to='#' class='disabled'>Sequence search</Link>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  )
}

export default NavbarMenu;
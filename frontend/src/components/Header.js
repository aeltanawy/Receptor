import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  NavLink,
  NavItem,
  Dropdown
} from 'react-bootstrap';

import { logout } from '../actions/auth';
import './Navbar.css';


function Header(props) {

  const { user, isAuthenticated } = props.auth;

  const userLinks = (
    <Dropdown as={NavItem} className='top'>
      <Dropdown.Toggle as={NavLink} className='dropdown top'>
        <span>{user ? user.username : ''}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className='dropdown-items top'>
        <Dropdown.Item href='/'>
          <div onClick={props.logout}>Logout</div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const guestLinks = (
    <nav className='top-menu'>
      <ul className='top-menu-items'>
        <li className='top-menu-text'>
          <Link to='/register'>
            <span>Sign up</span>
          </Link>
        </li>
        <span className="vertical-line" />
        <li className='top-menu-text'>
          <Link to='/login'>
            <span>Login</span>
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <div className='header'>
      <div className='app-header'>
        <div className='logo'>
          <img
            className='logo-img'
            src='/receptor_logo.gif'
            alt='Receptor application for storing oligos'
          />
        </div>
        <div className='auth'>
          { isAuthenticated ? userLinks : guestLinks }
        </div>
      </div>
    </div>
  )
}

// export default Header;
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
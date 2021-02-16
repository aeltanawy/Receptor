import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {
  render() {
    return (
    <div className='header'>
      <div className='app-header'>
        <div className='logo'>
          <img src='/receptor_logo.gif' alt=''/>
        </div>
        <nav className='top-menu'>
          <ul className='top-menu-items'>
            <li className='top-menu-text'>
              <Link to='/signup'>
                <span>Sign up</span>
              </Link>
            </li>
            <span className="vertical-line" />
            <li className='top-menu-text'>
              <Link to='/login'>
                  <span>Log in</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    )
  }
}

export default Header;
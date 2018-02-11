import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <nav className="header-icons">
        <ul>
          <li>
            <i className="icon menu-icon">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </i>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Nav;
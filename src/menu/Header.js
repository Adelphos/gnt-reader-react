import React, { Component } from 'react';
import Nav from './Nav.js';
import * as Resources from '../resources/Resources.js';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <span className="current-selection-wrapper">
          {Resources.bookLongNames[this.props.selectedBook]}
          &nbsp;
          {this.props.selectedChapter}
        </span>
        <Nav />
      </header>
    );
  }
};

export default Header;
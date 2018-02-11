import React, { Component } from 'react';
import * as AppConstants from '../constants/AppConstants.js';
import Loader from '../loader/Loader.js';

function Word() {

}

function Verse() {

}

class Reader extends Component {
  render() {
    return (
      <section>
        {this.props[AppConstants.BOOK]}
        {this.props[AppConstants.CHAPTER]}
        <Loader remove={this.props[AppConstants.MORPH]} />
        {this.props[AppConstants.MORPH]}
      </section>
    );
  }
};

export default Reader;
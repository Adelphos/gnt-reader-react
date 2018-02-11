import React, { Component } from 'react';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: null
    };
  }

  render() {
    return (
      <section>[Info panel] {this.state.selectedWord}</section>
    );
  }
};

export default Info;
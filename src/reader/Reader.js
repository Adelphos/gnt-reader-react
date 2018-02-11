import React, { Component } from 'react';
import * as AppConstants from '../constants/AppConstants.js';
import Loader from '../loader/Loader.js';
import * as Resources from '../resources/Resources.js';

function Word(props) {
  return <span data-lex={props.lex} data-morph={props.morph}>{props.form}</span>;
}

function Verse(props) {
  const words = props[AppConstants.WORDS]
    .map(word => <Word form={word[0]} lex={word[2]} morph={word[1]} />);
  return (
    <div className="verse">
      <span className="verse-num">{props[AppConstants.VERSE]}</span>
      {words}
    </div>
  );
}

class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [AppConstants.BOOK]: props[AppConstants.BOOK],
      [AppConstants.CHAPTER]: props[AppConstants.CHAPTER],
      [AppConstants.MORPH]: props.morph || null
    }

    // bind methods
    this.loadPassage = this.loadPassage.bind(this);
  }

  componentWillMount() {
    this.loadPassage({
      [AppConstants.BOOK]: this.props[AppConstants.BOOK],
      [AppConstants.CHAPTER]: this.props[AppConstants.CHAPTER]
    });
  }

  componentWillReceiveProps(nextProps) {
    this.loadPassage({
      [AppConstants.BOOK]: nextProps[AppConstants.BOOK],
      [AppConstants.CHAPTER]: nextProps[AppConstants.CHAPTER]
    });
  }

  render() {
    let passage = this.state[AppConstants.MORPH];
    if (passage) {
      passage = passage.map(verse => {
        return (<Verse
          verse={verse[AppConstants.VERSE]}
          words={verse[AppConstants.WORDS]} />
        );
      });
    }
    return (
      <section>
        {this.state[AppConstants.BOOK]}
        {this.state[AppConstants.CHAPTER]}
        <Loader remove={this.state[AppConstants.MORPH]} />
        {passage}
      </section>
    );
  }

  loadPassage(passage) {
    Resources
      .getMorphology(
        passage[AppConstants.BOOK],
        passage[AppConstants.CHAPTER]
      )
      .then(morph => {
        this.setState({
          [AppConstants.MORPH]: morph
        });
      });
  }
};

export default Reader;
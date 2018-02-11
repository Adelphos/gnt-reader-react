import React, { Component } from 'react';
import * as Resources from '../resources/Resources.js';
import * as AppConstants from '../constants/AppConstants.js';

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBook: 'MT',
      selectedChapter: 1
    };
    this.onClickBook = this.onClickBook.bind(this);
    this.onClickChapter = this.onClickChapter.bind(this);
    this.browsePassage = this.browsePassage.bind(this);
  }

  render() {
    const books = Resources.bookShortNames.map(book => (
      <Book
        selected={this.state.selectedBook === book}
        bookShortName={book}
        name={Resources.bookMediumNames[book]}
        chapterCount={Resources.chapterCounts[book]}
        key={book}
        handleClickBook={this.onClickBook}
        handleClickChapter={this.onClickChapter} />
    ));

    return (
      <nav className="navPanel nav-panel">
        {books}
      </nav>
    )
  }

  onClickBook(e) {
    e.preventDefault();
    this.setState({
      selectedBook: e.target.dataset.value,
      selectedChapter: 1
    }, this.browsePassage);
  }

  onClickChapter(e) {
    e.preventDefault();
    this.setState({
      selectedChapter: parseInt(e.target.dataset.value, 10)
    }, this.browsePassage);
  }

  browsePassage() {
    this.props.onBrowsePassage({
      [AppConstants.BOOK]: this.state.selectedBook,
      [AppConstants.CHAPTER]: this.state.selectedChapter
    });
  }
}

function Book(props) {
  let chapters = null;
  if (props.selected) {
    chapters = (
      <div className="book-chapters">
        <Chapters count={props.chapterCount} handleClick={props.handleClickChapter} />
      </div>
    );
  }
  return (
    <div className={`${props.selected ? 'opened ' : ''}nav-entry`}>
      <a className="book" data-value={props.bookShortName} onClick={props.handleClickBook}>
        {props.name}
      </a>
      {chapters}
    </div>
  );
}

function Chapters(props) {
  const chapters = [];
  for (let i=1; i<=props.count; i++) {
    chapters.push(i);
  }
  return chapters.map(num => (
    <a
       className="chapter"
       data-value={num}
       key={num}
       onClick={props.handleClick}>
      {num}
    </a>
  ));
}

export default Browse;
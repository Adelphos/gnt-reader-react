import React, { Component } from 'react';
import Header from './menu/Header.js';
import Browse from './menu/Browse.js';
import Reader from './reader/Reader.js';
import Info from './info/Info.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedBook: 'MT',
      selectedChapter: 1
    };
    this.onBrowsePassage = this.onBrowsePassage.bind(this);
  }

  render(props) {
    return (
      <div className="App main-container">
        <Header
          selectedBook={this.state.selectedBook}
          selectedChapter={this.state.selectedChapter} />
        <Browse
          onBrowsePassage={this.onBrowsePassage}
          selectedBook={this.state.selectedBook}
          selectedChapter={this.state.selectedChapter} />
        <Reader
          book={this.state.selectedBook}
          chapter={this.state.selectedChapter} />
        <Info />
      </div>
    );
  }

  onBrowsePassage(passage) {
    this.setState({
      selectedBook: passage.book,
      selectedChapter: passage.chapter
    });
  }
}


export default App;

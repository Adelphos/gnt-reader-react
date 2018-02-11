import React, { Component } from 'react';
// import logo from './logo.svg';
import Header from './menu/Header.js';
import Browse from './menu/Browse.js';
import Reader from './reader/Reader.js';
import Info from './info/Info.js';
import $ from 'jquery';
import * as AppUtil from './util/AppUtil.js';
import * as AppConstants from './constants/AppConstants.js';
import * as Resources from './resources/Resources.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedBook: 'MT',
      selectedChapter: 1
    };
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onBrowsePassage = this.onBrowsePassage.bind(this);
  }

  render(props) {
    return (
      <div className="App">
        <Header />
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

  onWindowResize() {
    console.log('resizing');
    var winHeight = $(window).height(),
        scrollTop = $(window).scrollTop(),
        docHeight = $(document).height();

    // Add next chapter on mobile scroll down
    if (!AppUtil.ScreenSize.isDesktop()
        && winHeight + scrollTop >= docHeight - 30) {
      // appendNextChapter();
      // TODO: Re-enable with scroll monitoring for scrolling back up.
      // renderNextChapter();
    }
  }

  onBrowsePassage(passage) {
    this.setState({
      selectedBook: passage.book,
      selectedChapter: passage.chapter
    });
  }

  componentDidMount() {
    // Scrolling
    // TODO: include when apputil is sorted out
    $(window).on("scroll", this.onWindowResize);
  }

  componentWillUnmount() {
    $(window).off("scroll", this.onWindowResize);
  }
}


export default App;

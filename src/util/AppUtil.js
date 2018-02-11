// Utility functions for the app

// Dependencies
import $ from 'jquery';

// Object to determine window size based on device widths
export const ScreenSize = {
  width : {
    mobile : 320,
    tablet : 800,
    desktop : 1200
  },

  isTablet : function () {
    return ($(window).width() < this.width.desktop && $(window).width() > this.width.tablet);
  },

  isMobile : function () {
    return ($(window).width() < this.width.tablet);
  },

  isDesktop : function () {
    return ($(window).width() > this.width.desktop);
  }
};



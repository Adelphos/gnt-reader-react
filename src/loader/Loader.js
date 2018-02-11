import React, { Component } from 'react';

export default function Loader(props) {
  if (props.remove) {
    return null;
  }
  return <div>Loading...</div>;
}
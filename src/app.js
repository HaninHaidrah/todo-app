import React from 'react';
import Header from './components/todo/Header';
import Settings from './components/todo/contex';
import ToDo from './components/todo/todo';

export default class App extends React.Component {
  render() {
    return (
        <Settings>
        {/* <Header> */}
        <Header />

      <ToDo />
      </Settings>
    );
  }
}
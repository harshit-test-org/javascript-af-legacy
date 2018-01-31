import React, { Component } from 'react';
import Sidemenu from './components/Sidemenu';
import Navbar from './components/styles/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar>
          <a href="#">Projects</a> •
          <a href="#">Feed</a>
        </Navbar>
        <Sidemenu />
      </div>
    );
  }
}

export default App;

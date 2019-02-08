import React, { Component } from 'react';
import './reset.css'
import './App.css';
import routes from './routes';
import Nav from './Components/Nav/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
      {routes}
      <Nav/>
      </div>
    );
  }
}

export default App;

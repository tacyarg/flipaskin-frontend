import React, { Component } from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';

import Trade from './pages/Trade/Trade'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Trade />
      </div>
    );
  }
}

export default App;

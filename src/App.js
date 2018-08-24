import React, { Component } from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';

import items from './libs/items'
import Inventory from './components/Inventory/Inventory'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-inventory">
          <Inventory tools={true} items={items} />
          <Inventory  items={items} />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './Trade.css'

import items from '../../libs/items'
import Inventory from '../../components/Inventory/Inventory'
import Actions from '../../components/Actions/Actions'

class Trade extends Component {
  render() {
    return (
      <div className="Trade">
        <div className="Trade-content">
          <Inventory tools={true} items={items} />
          <Actions />
          <Inventory tools={true} items={items} />
        </div>
      </div>
    );
  }
}

export default Trade;

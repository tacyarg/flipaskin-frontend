import React, { Component } from 'react';
import './Trade.css'

import items from '../../libs/items'
import Inventory from '../../components/Inventory/Inventory'
import Actions from '../../components/Actions/Actions'

class Trade extends Component {
  render() {
    var { callAction } = this.props
    return (
      <div className="Trade">
        <div className="Trade-content">
          <div className="Trade-content-left">
            <Inventory
              tools={true}
              getContent={() => {
                return callAction('scanMyTradeUrl')
              }}
            />
          </div>
          <div className="Trade-content-right">
            some stuff some stuff some stuff some stuff some stuff
          </div>
        </div>
      </div>
    );
  }
}

export default Trade;

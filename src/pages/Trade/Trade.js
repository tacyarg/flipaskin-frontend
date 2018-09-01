import React, { Component } from 'react';
import './Trade.css'

import items from '../../libs/items'
import Inventory from '../../components/Inventory/Inventory'
import Actions from '../../components/Actions/Actions'

class Trade extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inventory: [],
      shop: []
    }
  }

  componentDidMount() {
    this.scanSteamInventory.bind(this)()
  }

  scanSteamInventory() {
    this.props.callAction('scanMyTradeUrl')
      .then(inventory => this.setState({inventory}))
  }

  render() {
    var {inventory, shop} = this.state
    return (
      <div className="Trade">
        <div className="Trade-content">
          <Inventory tools={true} items={inventory} />
          {/* <Actions /> */}
          {/* <Inventory tools={true} items={items} /> */}
        </div>
      </div>
    );
  }
}

export default Trade;

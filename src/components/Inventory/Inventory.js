import React, { Component } from 'react'
import { InputGroup, Button, Tag } from '@blueprintjs/core'
import './Inventory.css'
import { clone, sumBy, isEqual } from 'lodash'

import utils from '../../libs/utils'
import ItemCard from '../ItemCard/ItemCard'
import CountUp from 'react-countup';
import { Spinner } from '@blueprintjs/core'


const Tools = ({ filterItems, items, onClick }) => {
  return <div className="Inventory-tools">
    <InputGroup
      leftIcon='search'
      placeholder={`Search ${items.length} skins...`}
      onChange={filterItems}
    />

    <Button
      onClick={onClick}
      minimal={true}
      text="Refresh"
      icon="refresh"
    />
  </div>
}

const Details = ({ items }) => {
  return <div className="Inventory-tools">
    <Tag minimal={true} large={true}>
      Total Value: <CountUp
        prefix="$"
        separator=","
        decimals={2}
        end={sumBy(items, 'suggested_price') / 100}
      />
    </Tag>
    <Tag minimal={true} large={true} >
      Total Items: {items.length}
    </Tag>
  </div>
}

const Items = ({ items, onClick }) => {
  return <div className="Inventory-items">
    {
      items.map(item => {
        if (!item.image) {
          item.price = 2.50
          item.image = item.imageURL;
        }
        item = utils.processItem(item)
        return <ItemCard
          key={item.id}
          {...item}
          onClick={e => onClick(item)}
        />
      })
    }
  </div>
}

class Inventory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tools: props.tools,
      loading: true,
      items: [],
      filteredItems: []
    }
  }

  componentDidMount() {
    this.refreshInventory.bind(this)
  }

  selectItem(item) {
    console.log(item)
  }

  filterItems(event) {
    var items = clone(this.state.items)

    this.setState({
      filteredItems: items.filter(item => {
        var value = event.target.value.toLowerCase()
        var itemName = item.name.toLowerCase()
        return itemName.indexOf(value) !== -1
      })
    })
  }

  refreshInventory() {
    this.setState({ loading: true })
    this.props.getContent().then(inventory => {
      this.setState({
        loading: false,
        items: inventory,
        filteredItems: inventory
      })
    })
  }

  render() {
    var { loading, filteredItems } = this.state
    return (
      <div className="Inventory-wrapper">
        {
          this.state.tools ?
            <Tools
              filterItems={this.filterItems.bind(this)}
              items={filteredItems}
              onClick={this.refreshInventory.bind(this)}
            /> :
            <Details items={filteredItems} />
        }
        <div className="Inventory-body">
          {
            loading ?
              <div className="Inventory-loader">
                <Spinner/>
              </div> :
              <Items
                items={filteredItems}
                onClick={this.selectItem}
              />
          }
        </div>

      </div>
    )
  }
}

export default Inventory


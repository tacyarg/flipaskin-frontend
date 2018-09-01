import React, { Component } from 'react'
import { InputGroup, Button, Tag } from '@blueprintjs/core'
import './Inventory.css'
import { clone, sumBy, isEqual } from 'lodash'

import utils from '../../libs/utils'
import ItemCard from '../ItemCard/ItemCard'
import CountUp from 'react-countup';


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

class Inventory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tools: props.tools,
      items: props.items,
      filteredItems: props.items
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (!isEqual(this.props.items, nextProps.items)) {
      this.setState({
        items: nextProps.items,
        filteredItems: nextProps.items
      })
    }
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
    
  }

  render() {
    return (
      <div className="Inventory-wrapper">
        {
          this.state.tools ?
            <Tools filterItems={this.filterItems.bind(this)} items={this.state.filteredItems} onClick={this.refreshInventory.bind(this)} /> :
            <Details items={this.state.filteredItems} />
        }
        <div className="Inventory-body">
          <div className="Inventory-items">
            {
              this.state.filteredItems.map(item => {
                if (!item.image) {
                  item.image = {}
                  item.suggested_price = 250
                  item.image['600px'] = item.imageURL;
                }
                item = utils.processItem(item)
                console.log(item)
                return <ItemCard
                  key={item.id}
                  {...item}
                  onClick={e => this.selectItem.bind(this)(item)}
                />
              })
            }
          </div>
        </div>

      </div>
    )
  }
}

export default Inventory


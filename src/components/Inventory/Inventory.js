import React, { Component } from 'react'
import { InputGroup, Button, Tag } from '@blueprintjs/core'
import './Inventory.css'
import { clone, sumBy } from 'lodash'

import utils from '../../libs/utils'
import ItemCard from '../ItemCard/ItemCard'
import CountUp from 'react-countup';


const Tools = ({filterItems, items}) => {
  return <div className="Inventory-tools">
    <InputGroup 
      leftIcon='search'
      placeholder={`Search ${items.length} skins...`} 
      onChange={filterItems}
    />

    <Button 
      minimal={true}
      text="Refresh"
      icon="refresh" 
    />
  </div>
}

const Details = ({items}) => {
  return <div className="Inventory-tools">
    <Tag minimal={true} large={true}> 
      Total Value: <CountUp 
        prefix="$" 
        separator="," 
        decimals={2} 
        end={sumBy(items, 'suggested_price')/100}
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

  render() {
    return (
      <div className="Inventory-wrapper">

          {
            this.state.tools ? 
              <Tools filterItems={this.filterItems.bind(this)} items={this.state.filteredItems} /> : 
              <Details items={this.state.filteredItems} />
          }

          <div className="Inventory-content">
            {
              this.state.filteredItems.map(item => {
                item = utils.processItem(item)
                return <ItemCard 
                  key={item.id}
                  {...item} 
                  onClick={e => this.selectItem.bind(this)(item)}
                />
              })
            }
          </div>

      </div>
    )
  }
}

export default Inventory


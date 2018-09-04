import React, { Component } from "react";
import { InputGroup, Button, Tag } from "@blueprintjs/core";
import "./Inventory.css";
import { filter, clone, sumBy, keyBy, map } from "lodash";

import utils from "../../libs/utils";
import ItemCard from "../ItemCard/ItemCard";
import CountUp from "react-countup";
import { Spinner } from "@blueprintjs/core";

const Tools = ({ filterItems, totalItems, onClick }) => {
  return (
    <div className="Inventory-tools">
      <InputGroup
        leftIcon="search"
        placeholder={`Search ${totalItems || 0} skins...`}
        onChange={filterItems}
      />

      <Button onClick={onClick} minimal={true} text="Refresh" icon="refresh" />
    </div>
  );
};

const Details = ({ items }) => {
  return (
    <div className="Inventory-tools">
      <Tag minimal={true} large={true}>
        Total Value:{" "}
        <CountUp
          prefix="$"
          separator=","
          decimals={2}
          end={sumBy(items, "suggested_price") / 100}
        />
      </Tag>
      <Tag minimal={true} large={true}>
        Total Items: {items.length}
      </Tag>
    </div>
  );
};

const Items = ({ items, onClick }) => {
  return (
    <div className="Inventory-items">
      {map(items, item => {
        if (!item.image) {
          item.price = 2.5;
          item.image = item.imageURL;
        }
        item = utils.processItem(item);
        return (
          <ItemCard 
            key={item.id} 
            {...item} 
            onClick={e => onClick(item)} 
          />
        );
      })}
    </div>
  );
};

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tools: props.tools,
      loading: true,
      items: {},
      shownItems: {},
      selectedItems: {},
      searchTerm: ''
    };
  }

  componentDidMount() {
    this.refreshInventory.bind(this)();
  }

  selectItem(item) {

    var items = clone(this.state.items)
    items[item.id].selected = !items[item.id].selected

    this.setState({ 
      items,
      selectedItems: filter(items, 'selected')
    })

    if(this.props.onSelect) {
      this.props.onSelect(items[item.id])
    }
  }

  filterItems(searchTerm) {
    var items = clone(this.state.items);
    items = filter(items, item => {
      var value = searchTerm.value.toLowerCase();
      var itemName = item.name.toLowerCase();
      return itemName.indexOf(value) !== -1;
    });
    items = keyBy(items, "id");

    this.setState({
      shownItems: items
    });
  }

  refreshInventory() {
    this.setState({ loading: true });
    this.props
      .getContent()
      .then(inventory => {

        inventory = map(inventory, item => {
          item.disabled = !item.name.includes('Key')
          return item
        })

        var items = keyBy(inventory, "id");
        this.setState({
          loading: false,
          items: items,
          shownItems: items,
          totalItems: inventory.length
        });
      });
  }

  render() {
    var { loading, shownItems } = this.state;
    return (
      <div className="Inventory-wrapper">
        {this.state.tools ? (
          <Tools
            filterItems={event => {
              this.setState({
                searchTerm: event.target
              })
              this.filterItems(event.target)
            }}
            totalItems={this.state.totalItems}
            onClick={this.refreshInventory.bind(this)}
          />
        ) : (
          <Details items={shownItems} />
        )}
        <div className="Inventory-body">
          {loading ? (
            <div className="Inventory-loader">
              <Spinner />
            </div>
          ) : (
            <Items items={shownItems} onClick={this.selectItem.bind(this)} />
          )}
        </div>
      </div>
    );
  }
}

export default Inventory;

import React, { Component } from "react";
import { InputGroup, Button, Tag } from "@blueprintjs/core";
import "./Inventory.css";
import { filter, clone, sumBy, keys, keyBy, map, each, orderBy } from "lodash";

import utils from "../../libs/utils";
import ItemCard from "../ItemCard/ItemCard";
import CountUp from "react-countup";
import { Spinner, Position } from "@blueprintjs/core";

const Tools = ({
  filterItems,
  totalItems,
  onClickRefresh,
  onClickSelectAll
}) => {
  return (
    <div className="Inventory-tools">
      <InputGroup
        leftIcon="search"
        placeholder={`Search ${totalItems || 0} skins...`}
        onChange={filterItems}
      />

      <div className={Position.RIGHT}>
        {/* <Button
          onClick={onClickSelectAll}
          minimal={true}
          text="Select All"
          icon="select"
        /> */}
        <Button
          onClick={onClickRefresh}
          minimal={true}
          text="Refresh"
          icon="refresh"
        />
      </div>
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
          item.price = item.buyPrice
          item.image = item.imageURL;
        }
        item = utils.processItem(item);
        return (
          <ItemCard key={item.id} {...item} onClick={e => onClick(item)} />
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
      searchTerm: ""
    };
  }

  componentDidMount() {
    this.props.onRef(this);
    this.refreshInventory();
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  selectItem = item => {
    var items = clone(this.state.items);
    item = items[item.id];
    item.selected = !item.selected;
    if (this.props.onSelect) this.props.onSelect(item);

    this.setState({
      items,
      selectedItems: filter(items, "selected")
    });
  };

  filterItems = searchTerm => {
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
  };

  refreshInventory = () => {
    this.setState({ loading: true });
    this.props.getContent().then(inventory => {
      var items = keyBy(inventory, "id");
      this.setState({
        loading: false,
        items: items,
        shownItems: items,
        totalItems: inventory.length
      });
    });
  };

  selectAll = () => {
    each(this.state.shownItems, this.selectItem);
  };

  render() {
    var { loading, shownItems } = this.state;
    return (
      <div className="Inventory-wrapper">
        {this.state.tools ? (
          <Tools
            filterItems={event => {
              this.setState({ searchTerm: event.target });
              this.filterItems(event.target);
            }}
            totalItems={this.state.totalItems}
            onClickRefresh={this.refreshInventory}
            onClickSelectAll={this.selectAll}
          />
        ) : (
          <Details items={shownItems} />
        )}
        <div className="Inventory-body">
          {loading ? (
            <div className="Inventory-loader">
              <Spinner />
            </div>
          ) : keys(shownItems).length === 0 ? (
            <div className="Inventory-loader">No items found...</div>
          ) : (
            <Items items={shownItems} onClick={this.selectItem} />
          )}
        </div>
      </div>
    );
  }
}

export default Inventory;

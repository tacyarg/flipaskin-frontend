import React from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import './ItemCard.css'

import { Classes } from '@blueprintjs/core'
import ClassNames from "classnames";

const ItemCard = ({ name, color, condition, image, price, onClick, disabled, selected }) => {

  var ItemClass = "ItemCard-item"

  if(disabled) {
    ItemClass = ClassNames("ItemCard-item", "ItemCard-item-disabled")
  } else if(selected){
    ItemClass = ClassNames("ItemCard-item", "ItemCard-item-selected")
  }
  
  return (
    <div className="ItemCard-wrapper">
      <Card
        interactive={!disabled}
        elevation={Elevation.ONE}
        className={ItemClass}
        onClick={!disabled? onClick : null}
      >
        <div className="ItemCard-top">
          <div className="ItemCard-itemName">{name}</div>
          <div className="ItemCard-itemCondition" style={{ color }}>{condition}</div>
        </div>
        <div className="ItemCard-itemImage">
          <img src={image} alt={name} />
        </div>
        <div className="ItemCard-itemPrice">${price.toFixed(2)}</div>
      </Card>
    </div>
  )
}

export default ItemCard


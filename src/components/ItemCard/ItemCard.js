import React from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import './ItemCard.css'

const ItemCard = ({ name, color, condition, image, price, onClick }) => {
  return (
    <div className="ItemCard-wrapper">
      <Card
        interactive={true}
        elevation={Elevation.ONE}
        className="ItemCard-item"
        onClick={onClick}
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


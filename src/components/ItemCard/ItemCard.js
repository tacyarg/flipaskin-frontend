import React from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import './ItemCard.css'

function CardBackground(bgImage) {
  return {
    borderRadius: '50%',
    transform: 'rotate(-30deg)',
    right: '-70px',
    bottom: '-60px',
    opacity: '0.25',
    minHeight: '175px',
    width: '210px',
    position: 'absolute',
    background: `url('${bgImage}')`,
    border: '1px solid black',
    // boxShadow: 'inset 0px 0px 10px rgba(0,0,0,1)'
  }
}

const ItemCard = ({name, color, condition, image, suggested_price, bgImage, onClick}) => {
  return (
    <div className="ItemCard-wrapper">
      <Card 
        interactive={true}
        elevation={Elevation.ONE}
        className="ItemCard-item"
        onClick={onClick}
      >
        {bgImage ? <div className="ItemCard-bg" style={CardBackground(bgImage)}/> : null}
        <div className="ItemCard-top">
          <div className="ItemCard-itemName">{name}</div>
          <div className="ItemCard-itemCondition" style={{color}}>{condition}</div>
        </div>
        <div className="ItemCard-itemImage">
          <img src={image ? image['600px'] : ''} alt={name} />
        </div>
        <div className="ItemCard-itemPrice">${(suggested_price/100).toFixed(2)}</div>
      </Card>
    </div>
  )
}

export default ItemCard


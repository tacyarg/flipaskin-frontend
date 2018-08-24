import React, { Component } from 'react'
import { Label, Checkbox, Button, NumericInput, RangeSlider, Icon, HTMLSelect } from '@blueprintjs/core'
import './Actions.css'
import { find, map } from 'lodash'

const PriceRange = ({min, max, range, onMinChange, onMaxChange}) => {
  return <div className="Actions-pricerange">
            <Label>Price Range:</Label>

    <div className="Actions-inputs">
      <NumericInput 
        leftIcon='dollar'
        buttonPosition="none"
        value={min}
        onValueChange={onMinChange}
      />
      <Icon icon="minus"/>
      <NumericInput 
        leftIcon='dollar'
        buttonPosition="none"
        value={max}
        onValueChange={onMaxChange}
      />
    </div>
      {/* <RangeSlider 
        // range={range}
        min={min}
        max={max}
        stepSize={5}
        labelStepSize={250}
        value={range}
        onChange={onChange}
      /> */}
  </div>
}

const FilterCheckbox = ({label, onChange}) => {
  return <Checkbox large={true} defaultChecked={true} label={label} onChange={e => onChange(label)}/>
}

class Actions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      maxPrice: 1000,
      minPrice: 0,
      filters: {
        "Keys": true,
        "Knives": true,
        "Rifles": true,
        "Pistols": true
      }
    }
  }

  submitTransaction() {
    console.log("make trade dude")
  }

  onMinChange(value) {
    this.setState({ minPrice: value })
  }

  onMaxChange(value) {
    this.setState({ maxPrice: value })
  }

  onCheckboxChange(label) {
    var toggle = !this.state.filters[label]
    this.state.filters[label] = toggle
    this.setState(this.state)
  }

  render() {
    var {minPrice, maxPrice, range} = this.state
    return (
      <div className="Actions-wrapper">
        <PriceRange 
          min={minPrice} 
          max={maxPrice} 
          range={[minPrice, maxPrice]} 
          onMinChange={this.onMinChange.bind(this)}
          onMaxChange={this.onMaxChange.bind(this)}
        /> 

        <div className="Action-checkbox-filters">
          <Label>Filters:</Label>
          {
            map(this.state.filters, (value, key) => {
              return <FilterCheckbox label={key} onChange={this.onCheckboxChange.bind(this)} />
            })
          }
        </div>

        <Button 
          onClick={this.submitTransaction.bind(this)}
          large={true}
          rightIcon="arrow-right"
          text="Begin Trade"
        />
      </div>
    )
  }
}

export default Actions


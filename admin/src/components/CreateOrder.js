import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateOrder extends Component {
  state = {
    numFlavors: ['','',''],
    quantities: {},
    city: 'Fresno',
    pickupDate: new Date().setDate(new Date().getDate()+1),
  }

  handleTextChange(prop, e) {
    this.setState({ [prop]: e.target.value });
  }

  handleDateChange(pickupDate) {
    this.setState({ pickupDate });
  }

  handleOrder(e) {
    const order = {
      donuts: this.state.quantities,
      address: this.state.address,
      pickupDate: this.state.pickupDate.toLocaleDateString(),
      name: this.state.name,
      phone: this.state.phone,
      city: this.state.city,
      zip: this.state.zip,
    }

    fetch('/orders/create', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) this.setState({
          address: '',
          name: '',
          phone: '',
          city: '',
          zip: '',
          quantities: {}
        })
      })
  }

  handleQuantity(name, e) {
    // TODO: sanitize inputs to exclude alphabets
    const quantities = { ...this.state.quantities };
    quantities[name] = e.target.value;
    this.setState({ quantities });
  }

  render() {
    return (
      <div>
        <h3>create order:</h3>
        <span>pickup / delivery date: </span>
        <DatePicker
          selected={this.state.pickupDate}
          onChange={this.handleDateChange.bind(this)}
          minDate={this.state.today}
        />
        <p/>
        {this.props.donuts.map(({ name, _id }) => (
          <div key={name}>
            <span>{name}</span>
            <input
              placeholder="leave empty for 0"
              type="text"
              value={this.state.quantities[name]}
              onChange={(e) => this.handleQuantity(name, e)}
            />
          </div>
        ))}
        <p />
        <div>
          <span>Name: </span>
          <input
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={(e) => this.handleTextChange('name', e)}
          />
        </div>
        <div>
          <span>Address: </span>
          <input
            type="text"
            placeholder="address"
            value={this.state.address}
            onChange={(e) => this.handleTextChange('address', e)}
          />
        </div>
        <div>
          <span>City: </span>
          <input
            type="text"
            placeholder="city"
            value={this.state.city}
            onChange={(e) => this.handleTextChange('city', e)}
          />
        </div>
        <div>
          <span>Zip: </span>
          <input
            type="text"
            placeholder="zip"
            value={this.state.zip}
            onChange={(e) => this.handleTextChange('zip', e)}
          />
        </div>
        <div>
          <span>Phone: </span>
          <input
            type="text"
            placeholder="phone #"
            value={this.state.phone}
            onChange={(e) => this.handleTextChange('phone', e)}
          />
        </div>
        <form onSubmit={this.handleOrder.bind(this)}>
        <input
          type="submit"
          value="create order"
        />
        </form>
      </div>
    );
  }
}

export default CreateOrder;

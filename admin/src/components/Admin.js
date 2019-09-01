import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const styles = {
  // TODO use a better styling engine.
  deleteButton: {
    color: 'red',
    fontSize: 24,
  }
}

export class Admin extends Component {
  state = {
    donuts: [],
    newName: '',
    newPrice: '',
    //create order statE:
    numFlavors: ['','',''],
    quantities: {},
    address: '',
    tomorrow: new Date().setDate(new Date().getDate()+1),
    // see orders:
    today: new Date(),
  }

  componentDidMount() {
    this.fetchDonuts();
  }

  handleDateChange(date) {
    console.log('date', date)
    this.setState({ startDate: date });
  }

  fetchDonuts() {
    this.setState({ newName: '', newPrice: '' });
    fetch('/donuts/all')
      .then(res => res.json())
      .then(donuts => this.setState({ donuts }));
  }

  handleRemove(_id) {
    fetch('/donuts/delete', {
      method: 'delete',
      body: JSON.stringify({ _id}),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) this.fetchDonuts()
        if (data.message) alert(data.message);
      })
  }

  handleAddDonut(e) {
    e.preventDefault();
    const newDonut = {
      name: this.state.newName,
      price: this.state.newPrice,
    };

    fetch('/donuts/create', {
      method: 'post',
      body: JSON.stringify(newDonut),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) this.fetchDonuts()
        if (data.message) alert(data.message);
      })
      .catch(err => {
        alert(err)
      });
  }

  handleChange(prop, event) {
    this.setState({ [prop]: event.target.value });
  }

  handleQuantity(name, e) {
    // TODO: sanitize inputs to exclude alphabets
    const quantities = { ...this.state.quantities };
    quantities[name] = e.target.value;
    this.setState({ quantities });
  }

  handleAddress(e) {
    this.setState({ address: e.target.value });
  }
  handleOrder(e) {
    e.preventDefault();

    console.log(this.state.quantities);
  }

  render() {
    // TODO. use react router and build out different pages for each of the sections here:
    return (
      <div>
        <h3>Current Donuts:</h3>
        {this.state.donuts.map(({ _id, name, price }) => {
          return (
            <div key={_id}>
            <span>{name} - {price}</span>
            <span style={styles.deleteButton} onClick={() => this.handleRemove(_id)}>{`  x`}</span>
            </div>
          )
        })}
        <p /><div>add new donut:</div>
        <form onSubmit={this.handleAddDonut.bind(this)}>
          <label>
            Name:
            <input type="text" value={this.state.newName} onChange={(e) => this.handleChange('newName', e)} />
          </label>
          <label>
            Price:
            <input type="text" value={this.state.newPrice} onChange={(e) => this.handleChange('newPrice', e)} />
          </label>
          <input type="submit" value="Add donut" />
        </form>




        <h3>create order:</h3>
        <span>order date:</span>
        <DatePicker
          selected={this.state.tomorrow}
          onChange={this.handleDateChange.bind(this)}
          minDate={this.state.tomorrow}
        />
        {this.state.donuts.map(({ name, _id }) => (
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
        <input
          type="text"
          placeholder="address"
          value={this.state.address}
          onChange={(e) => this.handleAddress(e)}
        />
        <form onSubmit={this.handleOrder.bind(this)}>
        <input
          type="submit"
          value="create order"
        />
        </form>




      <h3>see orders:</h3>
      <DatePicker
        selected={this.state.today}
        onChange={this.handleDateChange.bind(this)}
      />
      </div>
    )
  }
}

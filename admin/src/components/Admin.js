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
    city: 'Fresno',
    tomorrow: new Date().setDate(new Date().getDate()+1),
    // see orders:
    today: new Date(),
    todaysOrders: [],
    todaysTotals: {},
  }

  componentDidMount() {
    this.fetchDonuts();

    //see orders:
    this.handleViewDate()
  }

  handleDateChange(date) {
    console.log('date', date)
    this.setState({ pickupDate: date });
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

  handleTextChange(prop, e) {
    this.setState({ [prop]: e.target.value });
  }

  handleOrder(e) {
    const order = {
      donuts: this.state.quantities,
      address: this.state.address,
      pickupDate: this.state.pickupDate || this.state.tomorrow,
      name: this.state.name,
      phone: this.state.phone,
      city: this.state.city,
      zip: this.state.zip,
    }

    console.log(this.state.quantities);
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




  handleViewDate(date) {
    fetch('/orders/date', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pickupDate: date || this.state.today })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ todaysOrders: data, today: date || new Date() })
        this.generateDailyTotals()
      })
  }

  generateDailyTotals() {
    const orders = this.state.todaysOrders;
    const todaysTotals = {};
    for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      Object.keys(order.donuts).forEach(flavor => {
        if (!todaysTotals[flavor]) {
          if (!order.donuts[flavor]) {
            todaysTotals[flavor] = 0;
          } else {
            todaysTotals[flavor] = parseInt(order.donuts[flavor]);
          }
        } else {
          if (!order.donuts[flavor]) {
            todaysTotals[flavor] += 0;
          } else {
            todaysTotals[flavor] += parseInt(order.donuts[flavor]);
          }
        }
      })
    }
    console.log('todaystotals', todaysTotals)
    this.setState({ todaysTotals });
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
          selected={this.state.pickupDate || this.state.tomorrow}
          onChange={this.handleDateChange.bind(this)}
          minDate={this.state.today}
        />
        <p/>
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




      <h3>see orders:</h3>
      <DatePicker
        selected={this.state.today}
        onChange={this.handleViewDate.bind(this)}
      />
      <ul>
        {Object.keys(this.state.todaysTotals).map((flavor) => (
          <li key={flavor}>{flavor} : {this.state.todaysTotals[flavor]}</li>
        ))}
      </ul>
      </div>
    )
  }
}

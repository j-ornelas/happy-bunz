import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class ViewOrders extends Component {
  state = {
    today: new Date(),
    todaysOrders: [],
    todaysTotals: {},
  }

  componentDidMount() {
    this.handleViewDate()
  }

  handleViewDate(date) {
    let dateToCheck = date || this.state.today;
    let pickupDate = dateToCheck.toLocaleDateString();
    fetch('/orders/date', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pickupDate: pickupDate })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) alert(data.message);
        this.setState({ todaysOrders: data, today: date || new Date() })
        this.generateDailyTotals()
      })
      .catch(err => alert(err.toString()))
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
    this.setState({ todaysTotals });
  }

  render() {
    return (
      <div>
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
        {/* TODO: make this into a table of some kind.*/}
        {this.state.todaysOrders.map((order) => (
          <div key={order._id}>{JSON.stringify(order)}</div>
        ))}
      </div>
    )
  }
}

export default ViewOrders;

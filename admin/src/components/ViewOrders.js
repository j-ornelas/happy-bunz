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
      if (order.donuts) Object.keys(order.donuts).forEach(flavor => {
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

  handleDelete(order) {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const { _id } = order;
      if (!_id) return alert('something is wrong with this order. Contact backend admin to manually delete.')
      fetch('/orders/id', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id })
      })
      .then(res => res.json())
      .then(data => {
        if (data.message) alert(data.message);
        if (data.success) this.handleViewDate(this.state.today);
      })
      .catch(err => alert(err.toString()))
    } else {
      return;
    }
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
        <div style={styles.ordersContainer}>
          {this.state.todaysOrders.map((order, index) => (
            <div style={index % 2 === 0 ? styles.evenCell : styles.oddCell} key={order._id}>
              <div><span style={styles.bold}>Donuts:</span> {JSON.stringify(order.donuts)}</div>
              <div><span style={styles.bold}>Name:</span> {order.name}</div>
              <div><span style={styles.bold}>Address:</span> {order.address}</div>
              <div><span style={styles.bold}>City:</span> {order.city}</div>
              <div><span style={styles.bold}>Zip:</span> {order.zip}</div>
              <div><span style={styles.bold}>Phone:</span> {order.phone}</div>
              <div onClick={() => this.handleDelete(order)} style={styles.deleteOrder}>{"   x"}</div>
            </div>
          ))}
          {this.state.todaysOrders.length === 0 && (
            <div>no orders for {this.state.today.toLocaleDateString()}</div>
          )}
        </div>
      </div>
    )
  }
}

const styles = {
  evenCell: {
    backgroundColor: 'offwhite',
    padding: '10px',
    position: 'relative',
  },
  oddCell: {
    backgroundColor: 'lightgrey',
    padding: '10px',
    position: 'relative',
  },
  ordersContainer: {
    border: '0.5px solid lightgrey'
  },
  bold: {
    fontWeight: 'bold'
  },
  deleteOrder: {
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    backgroundColor: 'red',
    height: '40px',
    width: '40px',
    borderRadius: '20px',
    position: 'absolute',
    right: -10,
    top: -10,
  }
}

export default ViewOrders;

import React, { Component } from 'react';
import CreateOrder from './CreateOrder';
import UpdateDonuts from './UpdateDonuts';
import ViewOrders from './ViewOrders';

export class Admin extends Component {
  state = {
    donuts: [],
    visiblePage: 'CREATE_ORDER' // UPDATE_DONUTS, CREATE_ORDER, VIEW_ORDERS;
  }

  componentDidMount() {
    this.fetchDonuts();
  }

  fetchDonuts() {
    this.setState({ newName: '', newPrice: '' });
    fetch('/donuts/all')
      .then(res => res.json())
      .then(donuts => this.setState({ donuts }));
  }

  render() {
    const { visiblePage } = this.state;
    return (
      <div>
        <div>
          <h3 onClick={() => this.setState({ visiblePage: 'UPDATE_DONUTS' })}>EDIT DONUTS</h3>
          <h3 onClick={() => this.setState({ visiblePage: 'CREATE_ORDER' })}>ADD ORDERS</h3>
          <h3 onClick={() => this.setState({ visiblePage: 'VIEW_ORDERS' })}>VIEW ORDERS</h3>
        </div>
        {visiblePage === 'UPDATE_DONUTS' && (
          <UpdateDonuts
            donuts={this.state.donuts}
            fetchDonuts={this.fetchDonuts.bind(this)}
          />
        )}
        {visiblePage === 'CREATE_ORDER' && (
          <CreateOrder donuts={this.state.donuts} />
        )}
        {visiblePage === 'VIEW_ORDERS' && (
          <ViewOrders />
        )}
      </div>
    )
  }
}

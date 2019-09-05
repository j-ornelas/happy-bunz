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

  isVisible(page) {
    return page === this.state.visiblePage;
  }

  render() {
    return (
      <div style={styles.body}>
        <div style={styles.header}>
        <span
          style={this.isVisible('CREATE_ORDER') ? styles.highlightedHeaderItem : styles.headerItem}
          onClick={() => this.setState({ visiblePage: 'CREATE_ORDER' })}>ADD ORDERS</span>
          <span
            style={this.isVisible('VIEW_ORDERS') ? styles.highlightedHeaderItem : styles.headerItem}
            onClick={() => this.setState({ visiblePage: 'VIEW_ORDERS' })}>VIEW ORDERS</span>
          <span
            style={this.isVisible('UPDATE_DONUTS') ? styles.highlightedHeaderItem : styles.headerItem}
            onClick={() => this.setState({ visiblePage: 'UPDATE_DONUTS' })}>EDIT DONUTS</span>
        </div>
        {this.isVisible('CREATE_ORDER') && (
          <CreateOrder donuts={this.state.donuts} />
        )}
        {this.isVisible('VIEW_ORDERS') && (
          <ViewOrders />
        )}
        {this.isVisible('UPDATE_DONUTS') && (
          <UpdateDonuts
            donuts={this.state.donuts}
            fetchDonuts={this.fetchDonuts.bind(this)}
          />
        )}
      </div>
    )
  }
}

const styles = {
  body: {
    padding: '10px'
  },
  header: {
    display: 'flex',
    width: '100vw',
    height: '10vh',
  },
  headerItem: {
    border: '1px solid lightgrey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33.3%',
    height: '100%',
  },
  highlightedHeaderItem: {
    border: '1px solid lightgrey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    width: '33.3%',
    height: '100%',
  },
}

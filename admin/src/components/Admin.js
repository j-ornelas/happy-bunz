import React, { Component } from 'react';

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

  render() {
    return (
      <div>
        {this.state.donuts.map(({ _id, name, price }) => {
          return (
            <div key={_id}>
            <span>{name} - {price}</span>
            <span style={styles.deleteButton} onClick={() => this.handleRemove(_id)}>{`  x`}</span>
            </div>
          )
        })}
        <p /><div>add new donut:</div>
        <form onSubmit={(e) => this.handleAddDonut(e)}>
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
      </div>
    )
  }
}

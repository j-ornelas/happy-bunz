import React, { Component } from 'react';

class UpdateDonuts extends Component {
  state = {
    newName: '',
    newPrice: '',
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
        if (data.success) {
          this.props.fetchDonuts();
          this.setState({ newName: '', newPrice: '' });
        }
        if (data.message) alert(data.message);
      })
      .catch(err => {
        alert(err.toString())
      });
  }

  handleRemove(_id) {
    fetch('/donuts/delete', {
      method: 'delete',
      body: JSON.stringify({ _id}),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) this.props.fetchDonuts()
        if (data.message) alert(data.message);
      })
  }

  handleChange(prop, event) {
    this.setState({ [prop]: event.target.value });
  }

  render() {
    return (
      <div>
        <h3>Current Donuts:</h3>
        {this.props.donuts.map(({ _id, name, price }) => {
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
      </div>
    );
  }
}

const styles = {
  // TODO use a better styling engine.
  deleteButton: {
    color: 'red',
    fontSize: 24,
  }
}

export default UpdateDonuts;

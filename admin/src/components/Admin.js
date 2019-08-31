import React, { Component } from 'react';

const styles = {
  deleteButton: {
    color: 'red',
    fontSize: 24,
  }
}

export class Admin extends Component {
  state = {
    donuts: [
      { name: 'chocolate', price: '1.99' }
    ],
    newName: '',
    newPrice: '',
  }

  componentDidMount() {
    fetch(`/api/test`)
      .then((res) => res.json())
      .then(info => console.log('info', info))
  }

  handleRemove(index) {
    console.log('removed!', index)
  }

  handleAddDonut(e) {
    e.preventDefault();

    const donuts = [ ...this.state.donuts ];

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
        if (data.success) donuts.push({ name: data.name, price: data.price })
        if (data.success) this.setState({ newName: '', newPrice: '', donuts });
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
        {this.state.donuts.map((donut, index) => {
          return (
            <div key={donut.name + index}>
            <span>{donut.name} - {donut.price}</span>
            <span style={styles.deleteButton} onClick={() => this.handleRemove(index)}>{`     x`}</span>
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

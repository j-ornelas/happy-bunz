import React, { Component } from 'react';


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

  handleAddDonut(e) {
    e.preventDefault();

    const donuts = [ ...this.state.donuts ];
    donuts.push({ name: this.state.newName, price: this.state.newPrice });

    this.setState({ newName: '', newPrice: '', donuts });
  }

  handleChange(prop, event) {
    this.setState({ [prop]: event.target.value });
  }

  render() {
    return (
      <div>
        {this.state.donuts.map((donut) => {
          return (
            <div key={donut.name}>{donut.name} - {donut.price}</div>
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

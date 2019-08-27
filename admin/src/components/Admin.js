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

  handleSubmit(e) {
    e.preventDefault();
    console.log('donuts: ', this.state.donuts)
    // take this.state.donuts and save it to the database.
    // maybe save everything and only use the most recent one in the app? idk yet.
  }

  handleRemove(index) {
    console.log('removed!', index)
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
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="submit" value="Save Changes" />
        </form>
      </div>
    )
  }
}

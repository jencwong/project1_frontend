import React, { Component } from "react";

class Main extends Component {
  state = {
    response: "",
    name: "",
    slot: "",
    responseToPost: "",
    reservations: []
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/reservations");
    const body = await response.json();

    console.log(body);
    this.setState({
      reservations: body
    });

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  async handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const slot = this.state.slot;

    const response = await fetch("/reservations/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        slot
      })
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  }

  render() {
    return (
      <div>
        <header></header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>New Reservation:</strong>
          </p>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="date"
            id="slot"
            name="slot"
            value={this.state.slot}
            onChange={e => this.setState({ slot: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>

        <ul>
          {this.state.reservations.map(reservation => {
            return (
              <li>
                Name: {reservation.name}, Slot: {reservation.slot}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Main;

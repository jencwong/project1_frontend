import React, { Component } from "react";

class Main extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
    reservations: []
  };

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

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/reservations/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div>
        <header></header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
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

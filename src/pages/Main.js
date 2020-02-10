import React, { Component } from "react";

class Main extends Component {
  state = {
    reservation: [],
    data: "",
    post: "",
    responseToPost: ""
  };

  async componentDidMount() {
    const results = await fetch("/reservations");
    const body = await results.json();
    console.log(body);
    if (results.status !== 200) throw Error(body.message);
    this.setState({
      reservation: body.name
    });
  }

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
        <p>
          {this.state.reservation.map(reservation => {
            return (
              <div>
                <h2>
                  {reservation.reservation.name}, {reservation.reservation.spot}
                </h2>
              </div>
            );
          })}
        </p>
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
      </div>
    );
  }
}

export default Main;

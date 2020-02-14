import React, { Component } from "react";
import { getReservations, postReservation } from "./Api";

class Parent extends Component {
  constructor() {
    super();
    this.state = {
      bookedReservations: [],
      availableSpots: [],
      name: ""
    };

    this.refreshReservations = this.refreshReservations.bind(this);
  }

  componentDidMount() {
    this.refreshReservations();
  }

  refreshReservations = () => {
    getReservations().then(reservations => {
      const available = Object.keys(reservations.available).filter(
        hour => reservations.available[hour] !== 0
      );
      this.setState({
        bookedReservations: reservations.booked,
        availableSpots: available
      });
    });
  };

  makeReservation = async timeSlot => {
    if (this.state.resName == "" || typeof this.state.resName !== "string") {
      alert("must be string");
      return;
    }
    let day = new Date();
    day.setHours(timeSlot.slice(0, 2), timeSlot.slice(3, 5), 0, 0);

    const newReservation = await postReservation(this.state.name, day);
    console.log("newReservation:", newReservation);

    this.setState({
      name: ""
    });
    this.refreshReservations();
  };
  render() {
    return (
      <div>
        <h1>RESERVATIONS</h1>
        {this.state.bookedReservations.map((res, ind) => (
          <div key={res.name + res.slot + ind}>
            {res.name} {res.slot}
          </div>
        ))}

        <input
          type="text"
          value={this.state.name}
          placeholder="Full Name"
          onChange={e => this.setState({ name: e.target.value })}
        />

        {this.state.availableSpots.map(timeSlot => (
          <button type="submit" onClick={() => this.makeReservation(timeSlot)}>
            {timeSlot.slice(0, 2) - 12} {timeSlot.slice(2)} PM
          </button>
        ))}
      </div>
    );
  }
}

export default Parent;

import React, { Component } from "react";
// import { Typography } from "@material-ui/core";
import Parent from "./Parent.js";
import Main from "./Main.js";

class Home extends Component {
  render() {
    return (
      <div>
        {/* <Parent /> */}
        <Main />
      </div>
    );
  }
}

// () => <Typography variant="h4">Welcome Home!</Typography>;
export default Home;

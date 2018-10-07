import React, { Component } from "react";
import MswReport from "./mswReport";
import YrWindReport from "./yrWindReport";

class SurfReport extends Component {
  state = {
    spotName: "",
    mswId: 3,
    yrId: 0
  };

  constructor(props) {
    super(props);
    this.state.spotName = props.spotName;
    this.state.mswId = props.mswId;
    this.state.yrId = props.yrId;
  }

  getSurfReport() {
    return (
      <div>
        <h1>Surfreport from {this.state.spotName}</h1>
        <MswReport spotId={this.state.mswId} />
        <YrWindReport spotId={this.state.yrId} />
      </div>
    );
  }

  render() {
    return this.getSurfReport();
  }
}

export default SurfReport;

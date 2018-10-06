import React, { Component } from "react";
import VindsidenReport from "./vindsidenReport";
import YrWindReport from "./yrWindReport";

class KiteReport extends Component {
  state = {
    spotName: "",
    vindsidenId: 3,
    yrId: 0
  };

  constructor(props) {
    super(props);
    this.state.spotName = props.spotName;
    this.state.vindsidenId = props.vindsidenId;
    this.state.yrId = props.yrId;
  }

  getKiteReport() {
    return (
      <div>
        <h1>Kitereport from {this.state.spotName}</h1>
        <VindsidenReport spotId={this.state.vindsidenId} />
        <YrWindReport spotId={this.state.yrId} />
      </div>
    );
  }

  render() {
    return this.getKiteReport();
  }
}

export default KiteReport;

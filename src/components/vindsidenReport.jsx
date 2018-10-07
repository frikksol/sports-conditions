import React, { Component } from "react";
import $ from "jquery";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import DirectionalArrows from "./directionalArrows";

class VindsidenReport extends Component {
  state = {
    spotId: 3,
    name: 0,
    windData: []
  };

  constructor(props) {
    super(props);
    this.state.spotId = props.spotId;
  }

  render() {
    if (this.state.windData.length === 0) {
      return <div />;
    }
    return (
      <React.Fragment>
        <h4>{"Windreport from vindsiden"}</h4>
        <ComposedChart
          width={800}
          height={300}
          data={this.state.windData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis dataKey="time" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="windMin"
            stackId="1"
            stroke="#004D00"
            fill="#FFFFFF"
          />
          <Line
            type="monotone"
            dataKey="windAvg"
            stackId="2"
            stroke="#004D00"
            fill="#009900"
          />
          <Area
            type="monotone"
            dataKey="windMax"
            stackId="1"
            stroke="#004D00"
            fill="#009900"
          />
          <YAxis type="number" domain={["dataMin", 1]} />
        </ComposedChart>
        <DirectionalArrows initialRotation={-90} data={this.state.windData} />
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getReportFromVindsiden();
  }

  getReportFromVindsiden() {
    $.ajax({
      type: "GET",
      url:
        "http://www.whateverorigin.org/get?url=" +
        encodeURIComponent(
          "http://vindsiden.no/xml.aspx?id=" + this.state.spotId + "&callback=?"
        ),
      dataType: "jsonp",
      success: function(data) {
        let XMLParser = require("react-xml-parser");
        let xml = new XMLParser().parseFromString(data.contents.toString());
        let tempData = [];
        let i;
        for (i = xml.children.length - 1; i > 0; i--) {
          tempData.push({
            time: this.getTimeFromDateTimeString(
              xml.children[i].children[2].value
            ),
            windMin: xml.children[i].children[7].value,
            windAvg: xml.children[i].children[3].value,
            windMax:
              xml.children[i].children[6].value -
              xml.children[i].children[7].value,
            arrowDirection: Math.floor(xml.children[i].children[8].value),
            temp: xml.children[i].children[11].value
          });
        }

        this.setState({
          name: xml.name,
          windData: tempData
        });
      }.bind(this)
    });
  }

  getTimeFromDateTimeString(dateTimeString) {
    var regex = /(\d\d)/g;
    let hour = dateTimeString.match(regex)[4];
    let minute = dateTimeString.match(regex)[5];
    return hour + ":" + minute;
  }
}

export default VindsidenReport;

import React, { Component } from "react";
import $ from "jquery";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

class VindsidenReport extends Component {
  state = {
    spotId: 3,
    name: 0,
    windData: []
  };

  render() {
    return (
      <React.Fragment>
        <h4>{this.state.name}</h4>
        <LineChart
          width={800}
          height={300}
          data={this.state.windData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis dataKey="time" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="windMin"
            stackId="1"
            stroke="#004D00"
            fill="#FFFFFF"
          />
          <Line
            type="monotone"
            dataKey="windAvg"
            stackId="1"
            stroke="#004D00"
            fill="#009900"
          />
          <Line
            type="monotone"
            dataKey="windMax"
            stackId="1"
            stroke="#004D00"
            fill="#009900"
          />
          <YAxis type="number" domain={["dataMin", 1]} />
        </LineChart>
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
        console.log(xml);
        console.log(xml.children[1]);
        console.log(xml.children.length);

        let tempData = [];
        let i;
        for (i = xml.children.length - 1; i > 0; i--) {
          tempData.push({
            time: xml.children[i].children[2].value,
            windMin: xml.children[i].children[7].value,
            windAvg: xml.children[i].children[3].value,
            windMax: xml.children[i].children[6].value,
            windDirection: xml.children[i].children[8].value,
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
}

export default VindsidenReport;

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

class YrWindReport extends Component {
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
            dataKey="windSpeed"
            stackId="1"
            stroke="#004D00"
            fill="#FFFFFF"
          />
          <YAxis type="number" domain={["dataMin", "dataMax"]} />
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
          "https://www.yr.no/place/Norway/Buskerud/Hurum/Verket/forecast.xml"
        ),
      dataType: "jsonp",
      success: function(data) {
        let fs = require("fs");
        let parse = require("xml-parser");
        let inspect = require("util").inspect;

        let xml = parse(data.contents.toString());
        let weatherData = xml.root.children[5].children[1].children;
        console.log(xml);

        let tempData = [];
        let i;
        var regex = /(\d\d)/g;
        for (i = 0; i < weatherData.length; i++) {
          let month = weatherData[i].attributes.from.match(regex)[2];
          let day = weatherData[i].attributes.from.match(regex)[3];
          console.log(month);
          tempData.push({
            time: day + "." + month,
            windSpeed: weatherData[i].children[3].attributes.mps,
            windDirection: weatherData[i].children[2].attributes.deg,
            temp: weatherData[i].children[4].attributes.value
          });
        }

        this.setState({
          name: xml.root.children[0].children[0].content,
          windData: tempData
        });
      }.bind(this)
    });
  }
}

export default YrWindReport;

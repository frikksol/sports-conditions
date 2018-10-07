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
import DirectionalArrows from "./directionalArrows";

class YrWindReport extends Component {
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
        <h4>{"Windreport from Yr"}</h4>
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
          "https://www.yr.no/place" + this.state.spotId + "/forecast.xml"
        ),
      dataType: "jsonp",
      success: function(data) {
        let parse = require("xml-parser");
        let xml = parse(data.contents.toString());
        let weatherData = xml.root.children[5].children[1].children;
        let tempData = [];
        let i;
        for (i = 0; i < weatherData.length; i++) {
          tempData.push({
            time: this.getDateFromDateTimeString(
              weatherData[i].attributes.from
            ),
            windSpeed: weatherData[i].children[3].attributes.mps,
            arrowDirection: weatherData[i].children[2].attributes.deg,
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

  getDateFromDateTimeString(dateTimeString) {
    var regex = /(\d\d)/g;
    let month = dateTimeString.match(regex)[2];
    let day = dateTimeString.match(regex)[3];
    return day + "." + month;
  }
}

export default YrWindReport;

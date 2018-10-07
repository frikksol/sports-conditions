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
        {this.getAllArrowImages()}
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getReportFromVindsiden();
  }

  getAllArrowImages() {
    let returnValue = [];
    for (let i = 0; i < this.state.windData.length; i++) {
      if (i === 0) {
        returnValue.push(
          this.getRotatedArrowImage(
            this.state.windData[i].windDirection,
            -25,
            -7.2,
            i
          )
        );
      } else if (i === this.state.windData.length - 1) {
        returnValue.push(
          this.getRotatedArrowImage(
            this.state.windData[i].windDirection,
            -7.2,
            0,
            i
          )
        );
      } else {
        returnValue.push(
          this.getRotatedArrowImage(
            this.state.windData[i].windDirection,
            -7.2,
            -7.2,
            i
          )
        );
      }
    }
    return returnValue;
  }

  getRotatedArrowImage(rotation, marginLeft, marginRight, key) {
    return (
      <img
        style={{
          transform: `rotate(${-90 + Math.floor(rotation)}deg)`, //Somehting is wrong with this rotation!
          padding: 5,
          marginLeft: marginLeft,
          marginRight: marginRight
        }}
        alt=""
        key={key}
        src={
          "http://iconshow.me/media/images/ui/ios7-icons/png/16/arrow-left-c.png"
        }
      />
    );
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

        let tempData = [];
        let i;
        for (i = xml.children.length - 1; i > 0; i--) {
          tempData.push({
            time: xml.children[i].children[2].value,
            windMin: xml.children[i].children[7].value,
            windAvg: xml.children[i].children[3].value,
            windMax:
              xml.children[i].children[6].value -
              xml.children[i].children[7].value,
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

import React, { Component } from "react";
import $ from "jquery";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import format from "moment";

class MswReport extends Component {
  state = {
    spotId: 3,
    name: 0,
    swellData: []
  };

  constructor(props) {
    super(props);
    this.state.spotId = props.spotId;
  }

  render() {
    return (
      <React.Fragment>
        <h4>{"Wavereport from Magic Seaweed"}</h4>
        <BarChart
          width={800}
          height={300}
          data={this.state.swellData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          barGap={0}
        >
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis dataKey="time" />
          <Tooltip />
          <Bar
            type="monotone"
            dataKey="waveMin"
            stackId="1"
            stroke="#339933"
            fill="#339933"
          />
          <Bar
            type="monotone"
            dataKey="waveMax"
            stackId="1"
            stroke="#9fdf9f"
            fill="#9fdf9f"
          />
          <Bar
            type="monotone"
            dataKey="swellHeight"
            stackId="2"
            stroke="#467fdb"
            fill="#467fdb"
          />
          <YAxis type="number" domain={["dataMin", 1]} />
        </BarChart>
        {this.getAllArrowImages()}
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getReportFromMsw();
  }

  getAllArrowImages() {
    let returnValue = [];
    for (let i = 0; i < this.state.swellData.length; i++) {
      if (i === 0) {
        returnValue.push(
          this.getRotatedArrowImage(
            this.state.swellData[i].swellDirection,
            -25,
            -7.2,
            i
          )
        );
      } else if (i === this.state.swellData.length - 1) {
        returnValue.push(
          this.getRotatedArrowImage(
            this.state.swellData[i].swellDirection,
            -7.2,
            0,
            i
          )
        );
      } else {
        returnValue.push(
          this.getRotatedArrowImage(
            this.state.swellData[i].swellDirection,
            -4,
            -4,
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
          transform: `rotate(${90 + Math.floor(rotation)}deg)`, //Somehting is wrong with this rotation!
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

  getReportFromMsw() {
    $.ajax({
      type: "GET",
      url:
        "http://www.whateverorigin.org/get?url=" +
        encodeURIComponent(
          "http://magicseaweed.com/api/21fc8b77c6694acbc52264fd5223ba68/forecast/?spot_id=" +
            this.state.spotId +
            "&units=eu"
        ),
      dataType: "jsonp",
      success: function(data) {
        let jsonData = JSON.parse(data.contents);
        console.log(jsonData);

        let tempData = [];
        let i;
        for (i = 0; i < jsonData.length; i++) {
          tempData.push({
            time: this.getDateFromUnixTime(jsonData[i].localTimestamp),
            waveMin: jsonData[i].swell.absMinBreakingHeight,
            waveMax:
              jsonData[i].swell.absMaxBreakingHeight -
              jsonData[i].swell.absMinBreakingHeight,
            swellHeight: jsonData[i].swell.components.combined.height,
            swellDirection: jsonData[i].swell.components.primary.direction,
            swellPeriod: jsonData[i].swell.components.combined.period
          });
        }

        this.setState({
          name: "",
          swellData: tempData
        });
      }.bind(this)
    });
  }

  getDateFromUnixTime(unixTime) {
    var timeString = new Date(unixTime * 1000);
    var formatted = timeString.toISOString();
    var regex = /(\d\d)/g;
    let month = formatted.match(regex)[2];
    let day = formatted.match(regex)[3];
    return day + "." + month;
  }
}

export default MswReport;

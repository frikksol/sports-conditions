import React, { Component } from "react";

class SnowReport extends Component {
  state = {
    resortId: 5,
    name: 0,
    powderAlarm: 0,
    snowSlopeTop: 0,
    snowTerrainTop: 0,
    snowSlopeBottom: 0,
    snowTerrainBottom: 0,
    snowToday: 0,
    lastupdated: 0
  };

  render() {
    return (
      <React.Fragment>
        <div class="card">
          <img
            class="card-img-top"
            src="https://www.skistar.com/no/om-skistar/snobakke-og-heisinfo/"
            alt="Card image cap"
          />
          <div class="card-body">
            <h4 class="card-title">{this.state.name}</h4>
            <h6 class="card-subtitle mb-2 text-muted">
              {this.state.powderAlarm === true ? "Powderalarm!" : ""}
            </h6>
            <span>
              {"Resort name: " + this.state.name} <br />{" "}
            </span>
            <span>
              {"Powder Alarm: " + this.state.powderAlarm} <br />{" "}
            </span>
            <span>
              {"Snow Today: " + this.state.snowToday} <br />{" "}
            </span>
            <span>
              {"Snow slope top: " + this.state.snowSlopeTop} <br />{" "}
            </span>
            <span>
              {"Snow terrain top: " + this.state.snowTerrainTop} <br />{" "}
            </span>
            <span>
              {"Snow slope bottom: " + this.state.snowSlopeTop} <br />{" "}
            </span>
            <span>
              {"Snow terrain bottom: " + this.state.snowTerrainBottom} <br />{" "}
            </span>
            <span>
              {"Last updated: " + this.state.lastupdated} <br />{" "}
            </span>
            <a href="#!" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getReportFromFnugg();
  }

  getReportFromFnugg() {
    fetch("http://api.fnugg.no/get/resort/" + this.state.resortId)
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({
          name: data._source.name,
          powderAlarm: data._source.conditions.current_report.top.powder_alarm,
          snowSlopeTop:
            data._source.conditions.current_report.top.snow.depth_slope,
          snowTerrainTop:
            data._source.conditions.current_report.top.snow.depth_terrain,
          snowSlopeBottom:
            data._source.conditions.current_report.bottom.snow.depth_slope,
          snowTerrainBottom:
            data._source.conditions.current_report.bottom.snow.depth_terrain,
          snowToday: data._source.conditions.current_report.top.snow.today,
          lastupdated: data._source.conditions.current_report.top.last_updated
        });
        console.log(data);
      });
  }
}

export default SnowReport;

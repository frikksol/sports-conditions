import React, { Component } from "react";

class KiteReport extends Component {
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
        <script src="/WebResource.axd?d=JAJK55a-oyvSfdbOk7fmDWpnSDPee5IuLhl9XoahCtApJQMwDmysbUMSOWil0fCD2meHMa0MIXyT6i04JyTZkzpwqHYWEm6k_Cbjy0xzHHs1&amp;t=636476155203255666" type="text/javascript"></script>        
        <h3>{"Resort name: " + this.state.name}</h3>
        <h3>{"Powder Alarm: " + this.state.powderAlarm}</h3>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getReportFromFnugg();
  }

  getReportFromFnugg() {



      
  }
}

export default KiteReport;

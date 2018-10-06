import React, { Component } from "react";
import "./App.css";
import SnowReport from "./components/snowReport";
import KiteReport from "./components/kiteReport";

class App extends Component {
  app() {
    return (
      <div>
        <KiteReport
          spotName={"Verket"}
          vindsidenId={3}
          yrId={"/Norway/Buskerud/Hurum/Verket"}
        />
        <KiteReport
          spotName={"Fuglevik"}
          vindsidenId={59}
          yrId={"/Norway/Østfold/Rygge/Fuglevik_båthavn"}
        />
      </div>
    );
  }

  render() {
    return <div className="App">{this.app()}</div>;
  }
}

export default App;

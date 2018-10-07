import React, { Component } from "react";
import "./App.css";
import KiteReport from "./components/kiteReport";
import SurfReport from "./components/surfReport";

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
        <SurfReport
          spotName={"Karmøy"}
          mswId={678}
          yrId={"/Norway/Rogaland/Karmøy/Karmøy"}
        />
        <SurfReport
          spotName={"Ervik"}
          mswId={1893}
          yrId={"/Norway/Sogn_og_Fjordane/Selje/Ervik"}
        />
      </div>
    );
  }

  render() {
    return <div className="App">{this.app()}</div>;
  }
}

export default App;

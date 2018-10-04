import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import SnowReport from "./components/snowReport";
import KiteReport from "./components/kiteReport";
import VindsidenReport from "./components/vindsidenReport";
import YrWindReport from "./components/yrWindReport";

ReactDOM.render(<YrWindReport />, document.getElementById("root"));
//ReactDOM.render(<SnowReport />, document.getElementById("root"));

registerServiceWorker();

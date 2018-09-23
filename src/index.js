import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import SnowReport from "./components/snowReport";
import KiteReport from "./components/kiteReport"

//ReactDOM.render(<SnowReport />, document.getElementById("root"));
ReactDOM.render(<SnowReport/>, document.getElementById("root"));
registerServiceWorker();

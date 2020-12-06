import "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import App from "./App";

export default hot(App);

ReactDOM.render(<App />, document.getElementById("root"));

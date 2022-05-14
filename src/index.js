import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import './fonts/dogicapixel.ttf';
import './fonts/JF-Dot-Ayu-18.woff';
import './fonts/JF-Dot-Ayu-18.woff2';
import './fonts/CascadiaCode.ttf';

import './customFonts.css';

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let dialogs = [
  { id: 1, name: "Dima" },
  { id: 2, name: "Nel" },
  { id: 3, name: "Yura" },
  { id: 4, name: "Oleg" },
  { id: 5, name: "Natasha" },
];

let messages = [
  { id: 1, message: "Hi" },
  { id: 2, message: "How" },
  { id: 3, message: "Yo" },
  { id: 4, message: "Yo" },
  { id: 5, message: "Yo" },
];

let posts = [
  { id: 1, message: "Hi, how are you", likeCount: 5 },
  { id: 2, message: "It's my first post", likeCount: 15 },
];

ReactDOM.render(
  <React.StrictMode>
    <App posts={posts} messages={messages} dialogs={dialogs} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

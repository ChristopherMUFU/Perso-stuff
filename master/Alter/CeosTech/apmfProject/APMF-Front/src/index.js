import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/Redux-store/store";
// function select(state) {
//   return state.contactNotification
// }

// let currentValue
// function handleChange() {
//   let previousValue = currentValue
//   currentValue = select(store.getState())

//   if (previousValue !== currentValue) {
//     console.log(
//       'Some deep nested property changed from',
//       previousValue,
//       'to',
//       currentValue
//     )
//   }
// }

// const unsubscribe = store.subscribe(handleChange)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

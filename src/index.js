import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StateContextProvider } from "./Context/stateProvider";
import { initialState } from "./Context/initialState";
import reducer from "./Context/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <StateContextProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateContextProvider>
  </BrowserRouter>
);

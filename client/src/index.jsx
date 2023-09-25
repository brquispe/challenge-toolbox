import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryParamsProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryParamsProvider>
        <App />
      </QueryParamsProvider>
    </Provider>
  </React.StrictMode>
);

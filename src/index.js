import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import App from "./App";

const store = createStore(reducers, applyMiddleware(ReduxThunk));

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

render(<Root />, document.getElementById("root"));

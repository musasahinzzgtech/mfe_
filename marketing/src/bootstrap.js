import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
const { createMemoryHistory, createBrowserHistory } = require("history");

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createBrowserHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  if (process.env.NODE_ENV === "development") {
    return {
      onParentNavigate: (pathname) => {
        const currentPath = history.location.pathname;
        console.log(
          "Marketing app received a navigation request from the container",
          currentPath,
          pathname,
        );
      },
    };
  }
  return;
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#_marketing_dev_root");
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };

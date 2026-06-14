import React from "react";
import { BrowserRouter } from "react-router-dom";
import MarketingApp from "./components/MarketingApp";
const App = () => {
  return (
    <BrowserRouter>
      <MarketingApp />
    </BrowserRouter>
  );
};

export default App;

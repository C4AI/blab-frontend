import React from "react";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { withTranslation } from "react-i18next";

import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

const App = withTranslation()(() => {
  return (
    <div className="App">
      <CssBaseline />
      <Body />
      <Footer />
    </div>
  );
});

export default App;

import React from "react"
import Body from "./components/Body"
import Footer from "./components/Footer";

import CssBaseline from "@material-ui/core/CssBaseline"
import "./App.css"

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Body />
      <Footer />
    </div>
  );
}

export default App;

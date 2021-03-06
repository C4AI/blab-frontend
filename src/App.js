import {React} from "react";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { withTranslation } from "react-i18next";

import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

import Page404 from "./components/Page404.js";
import {Routes, Route} from "react-router-dom";
import LanguageSwitch from "./components/LanguageSwitch.js";

const App = withTranslation()(() => {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route exact path="/" element={<Body />}>
        </Route>
        <Route path="*" element={<Page404 />}>
        </Route>
      </Routes>
      <LanguageSwitch/>
      <Footer />
    </div>
  );
});

export default App;

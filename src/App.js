import { React } from "react";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { withTranslation } from "react-i18next";

import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

import Page404 from "./components/Page404.js";
import {Routes, Route} from "react-router-dom";
import LanguageSwitch from "./components/LanguageSwitch";
import isValidBrowser from "./detectBrowser";

const App = withTranslation()(() => {
    return (
    isValidBrowser ?
      <div className="App">
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<Body initialLanguage={null}/>}/>
          <Route path="*" element={<Page404 />}/>
        </Routes>
        <LanguageSwitch/>
        <Footer />
      </div>
      :
      <div className="invalidBrowser">A versão de seu navegador é insuficiente para carregar o site.
           Por favor, atualize seu navegador e tente novamente.</div>
  );
});

export default App;

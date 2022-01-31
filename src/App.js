import Header from "./components/Header"
import Body from "./components/Body"
import Footer from "./components/Footer";

import { CssBaseline } from "@material-ui/core"
import "./App.css"

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;

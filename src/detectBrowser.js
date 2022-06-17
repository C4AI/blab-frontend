import Bowser from "bowser";

const browser = Bowser.getParser(window.navigator.userAgent);

const isValidBrowser = browser.satisfies(
  {
    chrome: ">=51",
    firefox: ">=54",
    opera: ">=22",
    safari: ">=10",
    edge: "15",
    samsung_internet: "79",
  }
);

export default isValidBrowser;

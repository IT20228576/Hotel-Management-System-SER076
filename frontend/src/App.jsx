import axios from "axios";
import Router from "./components/routers/Router";

axios.defaults.withCredentials = true;

const App = () => {
  return (
      <Router />
  );
};

export default App;

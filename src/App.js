import "./App.css";
import { Switch, Route } from "react-router-dom";
import BigCalendar from "./components/BigCalendar";
import Login from "./components/Login";

function App() {
  return (
    <Switch>
      <div className="App">
        <Route path="/login" component={Login} />
        <Route exact path="/" component={BigCalendar} />
      </div>
    </Switch>
  );
}

export default App;

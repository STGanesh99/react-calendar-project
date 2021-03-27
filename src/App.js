import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BigCalendar from './components/BigCalendar'
import Login from "./components/Login"

function App() {
  return (
    <Router basename="/calendar">
    <Switch>
    <div className="App">
    <Route path="/calendar" component={()=><BigCalendar/>} />
    <Route exact path="/" component={()=><Login/>} />
    </div>
    </Switch>
    </Router>
  );
}

export default App;

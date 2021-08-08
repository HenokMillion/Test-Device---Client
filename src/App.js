import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import UsersTable from './components/usersTable';
import Users from './views/Users';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/users" component={Users} exact />
        <Route path="*" component={Login} exact />
      </Switch>
    </Router>
  );
}

export default App;

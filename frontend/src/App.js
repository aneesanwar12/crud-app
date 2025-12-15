import { Route, Switch } from "react-router-dom";
import AddUser from "./components/AddUser";
import ViewUser from "./components/ViewUser";
import ViewLogs from "./components/ViewLogs";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <ViewUser />
        </Route>
        <Route exact path="/viewusers">
          <ViewUser />
        </Route>
        <Route exact path="/adduser">
          <AddUser />
        </Route>
        <Route exact path="/viewlogs">
          <ViewLogs />
        </Route>
      </Switch>
    </>
  );
}

export default App;

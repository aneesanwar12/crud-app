import { Route, Switch } from "react-router-dom";
import AddUser from "./components/AddUser"
import ViewUser from "./components/ViewUser"

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/"><ViewUser /></Route>
        <Route exact path="/viewusers"><ViewUser /></Route>
        <Route exact path="/adduser"><AddUser /></Route>
      </Switch>
    </>
  );
}

export default App;

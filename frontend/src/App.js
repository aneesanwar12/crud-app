import { Route, Switch } from "react-router-dom";
import { ViewProducts } from "./components/Products/ViewProducts";
import { Login } from "./components/Login/Login";
import { AddProduct } from "./components/Products/AddProduct";
import { ViewLogs } from "./components/Logs/ViewLogs";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <ViewProducts />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/viewproducts">
          <ViewProducts />
        </Route>
        <Route exact path="/addproduct">
          <AddProduct />
        </Route>
        <Route exact path="/viewlogs">
          <ViewLogs />
        </Route>
      </Switch>
    </>
  );
}

export default App;

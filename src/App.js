import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import ScenarioForm from "./ScenarioForm";
import VehicleForm from "./VehicleForm";
import Simulation from "./Simulation";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/scenarios/new" component={ScenarioForm} />
        <Route exact path="/vehicles/new" component={VehicleForm} />
        <Route exact path="/scenarios/:id/simulation" component={Simulation} />
      </Switch>
    </Router>
  );
};

export default App;

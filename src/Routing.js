import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import AddRecord from "./components/AddRecord";
import Dashboard from "./components/Dashboard";
import EditRecord from "./components/EditRecord";
import Login from "./components/Login";
import LoginTest from "./components/LoginTest";
import Register from "./components/Register";
import Testgrid from "./components/Testgrid";


export function Main() {
  return (
    <main>
      
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/newRecord" component={AddRecord} />
        <Route exact path="/editRecord" component={EditRecord} />
        <Route exact path="/dashboard" component={Dashboard} />
        
      </Switch>
    </main>
  );
}

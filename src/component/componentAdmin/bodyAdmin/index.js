import React from "react";
import { Switch, Route } from "react-router";
import "./style.scss";
import * as linkRouter from "../../../constants/router";
import Dashboard from "./dashboard";
import ManagerUser from "./managerUsers";
import ManagerProduct from "./managerProduct";
import ManagerOrders from "./managerOrders";

export default function BodyAdmin() {
  return (
    <section className="col-10 body-admin">
      <Switch>
        <Route exact path={linkRouter.admin}>
          <Dashboard />
        </Route>
        <Route path={linkRouter.adminUsers}>
          <ManagerUser />
        </Route>
        <Route path={linkRouter.adminProducts}>
          <ManagerProduct />
        </Route>
        <Route path={linkRouter.adminOrders}>
          <ManagerOrders />
        </Route>
      </Switch>
    </section>
  );
}

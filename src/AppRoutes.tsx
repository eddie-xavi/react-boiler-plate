import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  Redirect,
  // useHistory,
  // useLocation
} from "react-router-dom";
import App from "./App";
import Dashboard from "./view/Dashboard/Dashboard";
interface IAppRoutesProps {
  auth: boolean
}
interface IRoutes {
  path: string,
  component: any,
  isAuthRoute?: boolean,
  routes?: IRoutes[]
}
const routes:IRoutes[] = [
  {
    path: "/",
    component: App,
  },
  {
    path: "/home",
    component: Dashboard,
    isAuthRoute: true,
  },
  {
    path: "*",
    component: () => <Redirect to="/" />,
  }
];
export default function AppRoutes({ auth = false }: IAppRoutesProps) {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => {
          if (route.isAuthRoute && auth) {
            return (
              <Route
                exact
                key={i}
                path={route.path}
                render={props => <route.component {...props} routes={route.routes} />}
              />
            )
          }
          if (!route.isAuthRoute) {
            return (
              <Route
                exact
                key={i}
                path={route.path}
                render={props => <route.component {...props} routes={route.routes} />}
              />
            )
          }
          return null;
        })}
      </Switch>
    </Router>
  );
}
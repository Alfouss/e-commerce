import React from "react";
import {Redirect , Route} from "react-router-dom";

const PrivateRoute = ({ component: Component }) => (
    
    <Route render={(props) => (
      localStorage.getItem("user") === "admin@admin.com"
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )

  export default  PrivateRoute;
import React from 'react';
import Routing from "./component/Routing"
import Register from "./component/Register";
import Admin from "./component/Admin";
import {Switch, Route} from "react-router-dom";
import {Container} from 'react-bootstrap';
import PrivateRoute from "./component/PrivateRoute"

function App() {
  return (
    <Container fluid>
        <Switch>
          <Route exact path="/" component={Routing}/>
          <PrivateRoute exact path="/admin" component={Admin}/>
          <Route exact path="/:type/:category" component={Routing}/>
          <Route exact path="/register"><Register path={{pathname:"register"}}/></Route>/>
          <Route exact path="/signin"><Register path={{pathname:"signin"}}/></Route>/>
          <Route exact path="/:type" component={Routing}/>
        </Switch>
    </Container>
    
  );
}

export default App;

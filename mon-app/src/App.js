import React from 'react';
import Routing from "./component/Routing"
import Register from "./component/Register";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import {Container} from 'react-bootstrap';

function App() {
  return (
    
    <Container fluid>
      <Router>
        <Switch>
          <Route exact path="/" component={Routing}/>
          <Route exact path="/:type/:category" component={Routing}/>
          <Route path="/register"><Register path={{pathname:"register"}}/></Route>/>
          <Route path="/signin"><Register path={{pathname:"signin"}}/></Route>/>
        </Switch>
      </Router>
    </Container>
    
  );
}

export default App;

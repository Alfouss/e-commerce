import React from 'react';
import Product from './Product';
import User from './User';
import { Navbar, Button, Nav  } from 'react-bootstrap';


class Admin extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            buttonModify: false // for choice the type of panel user or product
        }
    }

    render(){
                return(
            <div>
                {this.state.buttonModify === true ?
                    <div>
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Toggle />
                            <Navbar.Brand>Mode Admin</Navbar.Brand>
                            <Nav className="mr-auto"></Nav>
                            <Nav>
                                <Button onClick={() => this.setState({buttonModify:false})}>Panel products</Button>
                                <Button onClick={() => {localStorage.clear();window.location.reload();}}>Deconnect</Button>
                            </Nav>
                        </Navbar>
                        <User/>
                    </div>
                :
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Toggle />
                        <Navbar.Brand>Mode Admin</Navbar.Brand>
                        <Nav className="mr-auto"></Nav>
                        <Nav>
                            <Button onClick={() => this.setState({buttonModify:true})}>Panel users</Button>
                            <Button onClick={() => {localStorage.clear();window.location.reload();}}>Deconnect</Button>
                        </Nav>
                    </Navbar>
                    <Product/>
                </div>
                }
            </div>
            
        )
    }
}

export default Admin;
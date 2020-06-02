import React from 'react';
import Product from './Product';
import User from './User';
import { Navbar, Button, Nav  } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'


class Admin extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.test)
        this.state = {
            buttonModify: false // for choice the type of panel user or product
        }
        this.deconnect = this.deconnect.bind(this);

    }
    
    deconnect(){
        localStorage.clear("user");
        this.props.history.push("/")

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
                                <Button onClick={this.deconnect}>Deconnect</Button>
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
                            <Button onClick={this.deconnect}>Deconnect</Button>
                        </Nav>
                    </Navbar>
                    <Product/>
                </div>
                }
            </div>
            
        )
    }
}

export default withRouter(Admin);
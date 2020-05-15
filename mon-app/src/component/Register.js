import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Button, Col, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Admin from './Admin';
import{connect} from "react-redux";
import { showUser, showProduct } from '../actions/actions';
import { bindActionCreators } from 'redux';
import * as serviceUser from "../services/serviceUser";
import * as serviceProduct from "../services/serviceProduct";
import {withRouter} from "react-router-dom";

class Register extends React.Component {
    constructor(props){
        super(props);

        this.sendForm = this.sendForm.bind(this);
        this.connect = this.connect.bind(this);

        
        this.state = {
            page: this.props.path.pathname,
            mail:"",
            password:"",
            datasUsers: [],
            check:""

        }
    }

    async componentDidMount(){
        let Users = await serviceUser.allDataUsers();
        let Products = await serviceProduct.allDataProducts();
        
        this.props.dispatch(showUser(Users.data));
        this.props.dispatch(showProduct(Products.data));
            
        this.setState({datasUsers: Users.data});
        
    }

   async sendForm(e){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.mail.value))
    {
        serviceUser.createUser(e);
        this.setState({page: "login", 
                     mail: e.target.mail.value, 
                     password: e.target.password.value});
        alert("Created");
        window.location.reload();
    }else{
        alert("Veuillez entrer une adress valide")
    }
       
    }

    

    async connect(e){
        // console.log(/^\w{8,12}/.test(e.target.password.value))
        // if(/^\w+(\.\w{8,12})+$/.test(e.target.password.value)){
        //     alert("toto")
        // }
        e.preventDefault();
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.mail.value))
        {
            let email = e.target.mail.value;
            let getUser = await serviceUser.checkUser(e);
            this.setState({page: null, check: getUser});
            if(email !== "admin@admin.com"){
                this.props.history.push("/")
            }
        }else{
            alert("veuillew entrez une adresse valide ")
        }
        
    }

    register(){
      return ( 
      <div> 
          {this.state.page === "register" && localStorage.getItem("user") === null &&
            <Col>
                <Form className="mb-3" onSubmit={this.sendForm}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="mail" ref="mail" placeholder="Enter email" />
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" ref="password" placeholder="Enter pass" />
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="passwordVerif" ref="passwordVerif" placeholder="Enter pass" />
                    </Form.Group>
                    <Button type="submit">Envoyer</Button>
                </Form>
                <Button type="button" onClick={() => { this.setState({page: "signin"})}}>Login</Button>
                <Link to="/"><Button>Accueil</Button></Link>
            </Col>
          }

          {this.state.page === "signin" && localStorage.getItem("user") === null && 
                <Col>
                    <Form className="mb-3" onSubmit={this.connect}>
                        <Form.Group controlId="form">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="mail" ref="mail" placeholder="Enter email" />
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" ref="password" placeholder="Enter pass" />
                        </Form.Group>
                        <Button type="submit">Envoyer</Button>
                    </Form>
                    <Button type="button"  onClick={() => { this.setState({page: "register"})}}>Register</Button>
                    <Link to="/"><Button>Accueil</Button></Link>
                </Col>
            }
            
            {localStorage.getItem("user") === "admin@admin.com" && 
                <Col>
                    <Admin/>
                </Col>
            }
        </div>)
        
    }
    
    render(){
        return(
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        {this.register()}
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        user: bindActionCreators(showUser, dispatch),
        product: bindActionCreators(showProduct, dispatch)
    }
  }
  
  export default connect(mapDispatchToProps)(withRouter(Register));
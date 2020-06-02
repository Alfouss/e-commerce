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
            check:"",
            admin:false

        }
    }

    async componentDidMount(){
        let Users = await serviceUser.allDataUsers();
        let Products = await serviceProduct.allDataProducts();
        this.props.dispatch(showUser(Users.data));
        this.props.dispatch(showProduct(Products.data));
            
        this.setState({datasUsers: Users.data});
        
    }

    checkPattern(type ,value){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) && type === "mail") return true
        if (/^\w{8,12}$/.test(value) && type === "password") return true
        return false
    }

   async sendForm(e){
        if (this.checkPattern("mail", e.target.mail.value))
        {
            if(this.checkPattern("password", e.target.password.value)){
                serviceUser.createUser(e);
            this.setState({page: "login", 
                        mail: e.target.mail.value, 
                        password: e.target.password.value});
            alert("Created");
            window.location.reload();
            }else{
                alert("Password short or no valid")
            }
        }else{
            alert("Adress not valid.Please can you enter a valid adress")
        }
       
    }

    

    async connect(e){

        

        e.preventDefault();
            if (this.checkPattern("mail", e.target.mail.value))
            {
                if(this.checkPattern("password", e.target.password.value)){
                    let getUser = await serviceUser.checkUser(e);
                    this.setState({page: null, check: getUser});
                    if(getUser !== "admin@admin.com"){
                        localStorage.setItem("user", getUser)
                        this.setState({admin: false})
                        this.props.history.push("/")
                }
                else{ 
                    localStorage.setItem("user", getUser)
                    this.props.history.push("/admin")

            }

            }else{
                alert("Wrong password")
            }
            
        }else{
            alert("veuillez entrez une adresse valide ")
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
                            <Form.Control  type="password" name="password" ref="password" placeholder="Enter pass" />
                        </Form.Group>
                        <Button type="submit">Envoyer</Button>
                    </Form>
                    <Button type="button"  onClick={() => { this.setState({page: "register"})}}>Register</Button>
                    <Link to="/"><Button>Accueil</Button></Link>
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
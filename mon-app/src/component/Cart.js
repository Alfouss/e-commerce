import React from 'react';
import {connect} from "react-redux";
import { deleteArticleFromCart } from '../actions/actions';
import { Container, Card, Button,  Row, Col, Form, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardPayment from "./Card"


class User extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            list: [],
            cart: this.props.cart,
            totalPrice: 0
        }
    }

    componentDidMount(){
        this.listCart();
    }

    async listCart(){
        console.log(await this.state.cart);
        let cart = await this.state.cart;
        let totalPrice = 0;
        let list = cart.map((value, index) => {
            totalPrice += value.quantity * value.price
            return(
                <Col key={index} sm={5} md={3} lg={3}>
                    <Card className="border border-secondary mt-3 mr-3"  style={{ width: '13em' }}>
                        <Card.Img variant="pic" src={window.location.origin + "/img/" + value.photo}  style={{ width: "auto", height: "200px" }}/>
                        <Card.Body>
                            <Link  to={"/article/"+value._id} className="p-0 text-dark">{value.article}</Link>
                            <Card.Text>{value.price}$</Card.Text>
                            <Card.Text>Quantity: {value.quantity}</Card.Text>
                            <Button onClick={() => {this.deleteArticleInCart(index)}} variant="primary">Delete</Button>
                            
                        </Card.Body>
                    </Card>
                </Col>
            )
       });
       console.log(totalPrice)
       this.setState({list: list, totalPrice: totalPrice})

    }
        
    async deleteArticleInCart(index){
        let newCart = await this.state.cart;
        newCart.splice(index, 1)
        this.props.deleteArticle(newCart);
    }
    
    render(){
        return(
            <Container>
                <Navbar collapseOnSelect className="pl-5" expand="lg" expand="md" bg="dark" variant="dark">
                    <Link to="/"><Navbar.Brand className="ml-1">Fou Cart</Navbar.Brand></Link>

                </Navbar>
                <Row>
                    <Col md={12} lg={12}>
                        <h6 className="text-center">Votre Panier</h6><br></br>
                    </Col>

                    <Col md={10} lg={10}>
                        <Row>
                            {this.state.list}
                        </Row>
                    </Col>
                    <Col >
                        <p variant="primary">Total price: {this.state.totalPrice}</p>
                        <Button variant="primary">Check cart</Button>
                    </Col>
                </Row>
                
            </Container>          
        )
        
    }
}

function mapStateToProps(state){
    return {
      cart: state.cart
    };
  }

function mapDispatchToProps(dispatch) {
  return { deleteArticle: (data) => {dispatch(deleteArticleFromCart(data))} }
}
export default connect(mapStateToProps, mapDispatchToProps)(User);
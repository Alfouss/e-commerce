import React  from "react";
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addProductInCart } from "../actions/actions";
import {connect} from "react-redux";
 
class ListCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            params: this.props.params,
        }
        this.addCart = this.addCart.bind(this);
    }

    async componentDidMount(){
        this.list(await this.props.products, this.props.params)
    }

    async componentWillReceiveProps(nextProps){
        this.list(await this.props.products, nextProps.params)

    }

    async list(data, endPoint){  
        let list;
        switch(endPoint.type){
            case "all":
                list = this.displayAll(data, endPoint)
            break;
            case "filter":
                list = this.displayByCategory(data, endPoint)
            break;
            case "searcharticle":
                list = this.displayByArticlesSearch(data, endPoint)
            break;
            case "sort":
                list = this.displayBySort(data, endPoint)
            break;
            case "article":
                list = this.displayOneArticle(data, endPoint)
            break;
            case "cart":
                list = this.displayCart(data)
            break;
            default:
            return null
    
        }
        this.setState({list: await list})
    }
    
    
    CardProduct (value, index) {
        return (
            <Col md={4} lg={3} key={index} >
                <Card className="border border-secondary mt-3 mr-3" style={{ width: '100%', height: "30em" }}>
                    <Card.Img variant="pic" src={window.location.origin + "/img/" + value.photo}  style={{ width: "auto", height: "16em" }}/>
                    <Card.Body>
                        <Link  to={"/article/"+value._id} className="p-0 text-dark">{value.article}</Link>
                        <Card.Text>{value.price}$</Card.Text>
                        <Card.Text>description: {value.describe}</Card.Text>
                        <Button onClick={() => {this.addCart(value)}} variant="primary">Add cart</Button>
                        
                    </Card.Body>
                </Card>
            </Col>
            
        )  
    }
    
    describeProduct(value, index){
        return (
            <Container fluid className="border border-secondary mt-3 mx-4" key={index} >
                <Row>
                    <Col lg={4}><img src={window.location.origin + "/img/" + value.photo} style={{ width: '25em', height: "20em" }}/></Col>
                    <Col>
                        <Row>
                            <Col lg={12}><p>{value.article}</p></Col>
                            <Col className="lead" lg={12}><p>{value.describe}</p></Col>
                            <Col>                
                                <Button  variant="primary">Add cart</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
    
        )  
    }
    
    async displayAll(data, endPoint){
        
        let list = await data.map((value, index) => {
        if(endPoint.category === (undefined || "all")){
            return this.CardProduct(value, index);    
            }
        });
        return list;
    }
    
    async displayByCategory(data, endPoint){
        let list = await data.map((value, index) => {
            
                if(endPoint.category === value.category){
                    return this.CardProduct(value, index);     
                }
                else if(endPoint.category === "all"){
                    return this.CardProduct(value, index);     
                }
            });
    
            return list
    }
    
    async displayByArticlesSearch(data, endPoint){
        let list = await data.map((value, index) => {
                if(endPoint.category === value.article.toLowerCase()){
                    return this.CardProduct(value, index);     
                }
            });
    
            return list;
    }
    
    async displayBySort(data, endPoint){
        let dataSort;
        let list;
            dataSort = await data;
            let sort = await data.sort((a, b) =>  a.price - b.price );
    
            if(endPoint.category === "low" ) {dataSort = sort} 
            else if(endPoint.category === "high") {dataSort = sort.reverse()}
        
             list = await dataSort.map((value, index) => {
                return this.CardProduct(value, index);  
            });
        
    
        return list
    }
    
    async displayOneArticle(data, endPoint){
        let list = await data.map((value, index) => {
                if(endPoint.category === value._id){
                    return this.describeProduct(value, index);     
                }
            });
            return list;
    }
    
    async displayCart(data){
        let list = await data.map((value, index) => {
                    return this.describeProduct(value, index);     
                
            });
            return list;
    }

    async addCart(value){
        let arrayCart = await this.props.cart;
        
        arrayCart.push({_id: value._id, article: value.article, price: value.price, quantity: 0, photo: value.photo});

        this.props.actions(this.checkIfExist(arrayCart))
    }

    checkIfExist(arrayCart){
        let newArray = arrayCart;

        for( var i = 0 ;i < arrayCart.length; i++){
                if (arrayCart[i]._id === arrayCart[arrayCart.length - 1]._id && newArray[i].quantity > 0){
                    
                    newArray[i].quantity += 1;
                    newArray.splice((arrayCart.length - 1), 1);
                    return newArray;
                }

                if ( arrayCart[i]._id === arrayCart[arrayCart.length - 1]._id && newArray[arrayCart.length - 1].quantity === 0){
            
                    newArray[i].quantity += 1;
                    return newArray;

                }
        }
        return newArray;
    }

    render(){
        return (
            
            <Row>{this.state.list}</Row>
        )
    }
    
}

function mapStateToProps(state){
    return {
      products: state.product,
      cart: state.cart,

    };
  }


function mapDispatchToProps(dispatch) {
    return { actions: (data) => {dispatch(addProductInCart(data))} }
  }

// export default Cart;
export default connect(mapStateToProps, mapDispatchToProps)(ListCard)

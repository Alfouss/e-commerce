import React from "react";
import { connect } from "react-redux";
import "../style/Acceuil.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import Header from "./Header";
import Filter from "./Filter";
import {ListCard} from "./ListCard";



class Accueil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            displayArticle: []
        }
    }

    async componentDidMount() {
        let products = await this.props.products;

        //Send values of products and props get to other component who will gonna to display the good card
        var display = await ListCard(products, this.props.params); 
        this.setState({data: products, displayArticle: await display});
    }

    async componentWillReceiveProps(nextProps) {
        var display = await ListCard(this.state.data, nextProps.params);
        this.setState({displayArticle: await display});
    }

    

    
    render() { 
        return (
            <div>
                <Header />
                <Container fluid>
                    <Row>
                        <Col xs="2" sm="2" md="3" lg="2" className="border border-secondary mt-3 ml-3"><Filter/></Col>
                        <Col><div className="flex">{this.state.displayArticle}</div></Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.product
    }
}
export default connect(mapStateToProps, null)(Accueil);
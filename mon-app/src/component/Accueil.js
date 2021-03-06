import React from "react";
import { connect } from "react-redux";
import "../style/Acceuil.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import Header from "./Header";
import Filter from "./Filter";
import ListCard from "./ListCard";



class Accueil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayArticle: [],
            params: this.props.params,
        }
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({params: nextProps.params});
    }

    

    
    render() { 
        return (
            <div>
                <Header />
                <Container fluid>
                    <Row>
                        <Col xs="2" sm="2" md="3" lg="2" className="border border-secondary mt-3 ml-3"><Filter/></Col>
                        <Col><ListCard params={this.state.params}></ListCard></Col>
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
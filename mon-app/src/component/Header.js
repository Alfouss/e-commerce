import React from "react";
import {Navbar, Nav, Button, Form, ListGroup} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";


class NavbarMenu extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            data: [],
            listArtcile:[],
            filterSearch: []
        }

        this.handleChange= this.handleChange.bind(this)
    }

    async componentDidMount(){
        let products = await this.props.products;
        this.setState({data: products});
        this.listArtcile();
    }

    async listArtcile(){
        
        let listArtcile = await this.state.filterSearch.map((value, index) => {
            
            return(
                
                <ListGroup.Item onClick={() => {this.props.history.push(`/article/${value}`); this.setState({listArtcile: []})}} key={index}>{value}</ListGroup.Item>
            )

        });
        
        this.setState({listArtcile: listArtcile});
    }

    // Active when i press a key in my input
    async handleChange(e){
        let arrayFilter = [];

        // Check if the letter entered her inside     
        await this.state.data.filter(value => {
            let wordSearching = e.target.value.toLowerCase()
            let word = value.article.toLowerCase();
            let findWord = word.includes(wordSearching);
            
            if(findWord){
                return arrayFilter.push(word)
            }

        })
         this.setState({filterSearch: arrayFilter});
        this.listArtcile();
        
    }

    render(){
        return(
                <Navbar collapseOnSelect className="pl-5" expand="lg" expand="md" bg="dark" variant="dark">
                    <Navbar.Brand className="ml-1" href="/">Fou Market</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {/* <Nav className="mr-auto" /> */}
                        <Nav className=" mt-3 mr-auto w-100">>
                                <Form.Group className="w-100" controlId="Search">
                                    <Form.Row>
                                        <Form.Control onChange={this.handleChange} type="text" placeholder="Search..." />
                                    </Form.Row>
                                    <Form.Row>
                                        <ListGroup className="w-100 position-absolute overflow-auto" style={{height: "100px", 'zIndex':"1"}}>
                                            {this.state.listArtcile}
                                        </ListGroup>
                                    </Form.Row>
                                </Form.Group>
                        </Nav>
                        <Nav>
                            <Nav.Link><Button>Panier</Button></Nav.Link>
                        </Nav>
                        <Nav >
                            { localStorage.getItem("user") === null &&
                            <div>
                                <Link to="/signin"><Button>login</Button></Link>
                                <Link to="/register"><Button>register</Button></Link>
                            </div>
                                
                            }
                            { localStorage.getItem("user") !== null &&
                                <Link to="/"><Button onClick={() => {localStorage.clear()}}>Deconnect</Button></Link>
                            }
                            
                        </Nav>
                                           
                    </Navbar.Collapse>
                </Navbar>
        )
    }
}

function mapStateToProps(state)  {
    return {
        products: state.product
    }
}

export default connect(mapStateToProps, null)(withRouter(NavbarMenu));
import React from "react"
import { Navbar, Nav, Button, Form, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'




class SearchArtcile extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            data: [],
            listArtcile:[],
            filterSearch: []
        }

        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount(){
       let products =  await this.props.products;
       this.setState({ data: products });
       this.listData();
    }

    async componentDidMount(){
        let products = await this.props.products;
        this.setState({data: products});
        this.listArtcile();
    }

    async listArtcile(){
        
        let listArtcile = await this.state.filterSearch.map((value, index) => {
            
            return(
                
                <ListGroup.Item onClick={() => {this.props.history.push(`/searcharticle/${value}`); this.setState({listArtcile: []})}} key={index}>{value}</ListGroup.Item>
            )

        });
        
        this.setState({listArtcile: listArtcile});
    }

    // Active when i press a key in my input
    async handleChange(e){
        let arrayFilter = [];
        let wordSearching = e.target.value.toLowerCase();

        if(wordSearching.length > 1){
            // Check if the letter entered her inside     
            await this.state.data.filter(value => {
                let word = value.article.toLowerCase();
                let findWord = word.includes(wordSearching);
                if(findWord){
                    return arrayFilter.push(word);
                }
            });
            this.setState({filterSearch: arrayFilter});
            this.listArtcile();
        }
    }

    render(){
        return(
            <Navbar collapseOnSelect expand="lg" expand="md" bg="dark" variant="dark">
                    <Link to="/"><Navbar.Brand className="ml-1">Fou Market</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {/* <Nav className="mr-auto" /> */}
                        <Nav className=" mt-3 mr-auto w-100">>
                                <Form.Group className="w-100" controlId="Search">
                                    <Form.Row>
                                        <Form.Control onChange={this.handleChange} type="text" placeholder="Search..." autoComplete="off"/>
                                    </Form.Row>
                                    <Form.Row>
                                        <ListGroup className="w-100 position-absolute overflow-auto" style={{height: "100px", 'zIndex':"1"}}>
                                            {this.state.listArtcile}
                                        </ListGroup>
                                    </Form.Row>
                                </Form.Group>
                        </Nav>
                        <Nav className="m-2">
                            <Link to="/cart" >
                                <svg className="bi bi-bag-fill" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <   path d="M1 4h14v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm7-2.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"/>
                                </svg>
                            </Link>
                        </Nav>
                        <Nav >
                            { localStorage.getItem("user") === null &&
                            <div>
                                <Link to="/signin"><Button>Login</Button></Link>
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



export default withRouter(SearchArtcile);
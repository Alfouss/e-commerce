import React from "react";
import { Form, ListGroup, Navbar } from "react-bootstrap"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            list: [],
            activeCategory: false
        }

        this.activeCategory = this.activeCategory.bind(this);
        this.sortBy = this.sortBy.bind(this);
    }

    async componentDidMount(){
       let products = await this.props.products;
       this.setState({data: products});
       this.categoryFilter();
       localStorage.setItem('categoryFilter', "all");
    }

    async categoryFilter(){
        let arrayCheckIfExist = [];
        let count = 0;
        let data = await this.state.data;

        for(var l = 0; l < data.length; l++){
            arrayCheckIfExist.push(data[l].category)
        }

        //Use loops for check the duplicate
         for(var z = 0; z < data.length; z++){
            for(var i = 0; i <arrayCheckIfExist.length; i++){
                if(data[z].category === arrayCheckIfExist[i]){
                    if(data[z].category !== undefined  && count >= 1){
                            arrayCheckIfExist.splice(i,1);
                    }
                    count++
                    }
                    

                
            }
            count = 0
        }
        
        //loop category for card 
       let list =  arrayCheckIfExist.map((category, index) =>{
            return (
                <ListGroup.Item action onClick={() => {this.activeCategory(category);}} key={index}> {category}</ListGroup.Item>
            );
       })
            
        this.setState({list: list})
    }

    //Function send to new route with new params
    async activeCategory(category){
        localStorage.removeItem('categoryFilter');
        localStorage.setItem('categoryFilter', category);
        this.props.history.push(`/filter/${category}`)
    }

    //Function send to new route the sort of items
    sortBy(e){
        let find = e.target.value;
        this.props.history.push(`/sort/${find}`)
    }

    render() {
        return (
            <div>
            <Form className="mt-3">
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Filter</Form.Label>
                    <Form.Control onClick={this.sortBy} as="select">
                        <option>default</option>
                        <option>low</option>
                        <option>high</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            
                <ListGroup>

                    <ListGroup.Item action onClick={() => {this.activeCategory('all');}}> Tout</ListGroup.Item>
                    {this.state.list}
                </ListGroup>
            
          </div>
        )
    }
}

//Get state in the store
const mapStateToProps = (state) => {
    return {
        products: state.product
    }
}
export default connect(mapStateToProps, null)(withRouter(Filter));
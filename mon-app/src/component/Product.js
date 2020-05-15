import React from "react";
import {connect} from "react-redux";
import { showProduct } from "../actions/actions";
import * as serviceProduct from  "../services/serviceProduct";
import {Button, Form} from 'react-bootstrap';

class Product extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listArtcile:[],
            data:[],
            displayThead:true
        }
        
        this.addArticle = this.addArticle.bind(this);
        this.updateListArticle = this.updateListArticle.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }
    async componentDidMount(){
        let products = await this.props.products;
        this.setState({data: products});
        this.listArtcile();
        
    }

     async listArtcile(){
        let listArtcile = await this.state.data.map((value, index) => {
            return(
                <tr key={index}>
                    <td>{value._id}</td>
                    <td>{value.article}</td>
                    <td>{value.describe}</td>
                    <td>{value.price}</td>
                    <td>{value.quantity}</td>
                    <td>{value.photo}</td>
                    <td>{value.category}</td>
                    <td><button onClick={this.updateListArticle}>Modify</button></td>
                    <td><button onClick={() => {this.deleteProduct(value._id)}}>Delete</button></td>
                </tr>
            )
        })
        
        this.setState({listArtcile: listArtcile, displayThead: true});
    }

    //Add article in the service who will comunnicate with nodejs
    async addArticle(e){
        await serviceProduct.addArticle(e)
        let products = await serviceProduct.allDataProducts();
        await this.props.dispatch(showProduct(products.data));
        this.setState({data: products.data});
        this.listArtcile();

    }

    //update article in the service who will comunnicate with nodejs
    async updateListArticle(){
        let listUpdate = await this.state.data.map((value, index) => {
            console.log(value.photo)
            return(
                <tr key={index}>
                    <td>
                        <form onSubmit={this.updateProduct}>
                            <label>id: <input name="id" type="text" placeholder={value._id} defaultValue={value._id}/></label>
                            <label>article: <input name="article" type="text" placeholder={value.article} defaultValue={value.article}/></label>
                            <label>describe: <input name="describe" type="text" placeholder={value.describe} defaultValue={value.describe}/></label>
                            <label>price: <input name="price" type="number" placeholder={value.price} defaultValue={value.price}/></label>
                            <label>quantity: <input name="quantity" type="number" placeholder={value.quantity} defaultValue={value.quantity}/></label>
                            <label>photo: 
                                { value.photo !== null || undefined  ?
                                    <input name="photo" type="text" defaultValue={value.photo}/>
                                :
                                    <input name="photo" type="file"/>

                                }
                            </label>
                            <label>category: <input name="category" type="text" defaultValue={value.category}/></label>
                            <input type="submit" value="Update"/>
                            <input type="submit" value="cancel"/>
                        </form>
                    </td>
                </tr>
            )
        });

        this.setState({listArtcile:listUpdate, displayThead: false});
    }

    //updated article in real-time with wich we get the array
    async updateProduct(e){
        serviceProduct.updateProduct(e);
        let tab = [e.target.id.value]
        for(var i = 0; i < this.state.data.length;i++){
            var obj = this.state.data[i];
            if(tab.indexOf(obj._id) !== -1){
                obj.article = e.target.article.value;
                obj.describe = e.target.describe.value;
                obj.price = e.target.price.value;
                obj.quantity = e.target.quantity.value;
                obj.photo = e.target.photo.value;
                obj.category = e.target.category.value;
            }         
        }
        this.listArtcile();
    }
    
    //Send article to the service who get and send to nodejs for the treatment of delete and the most is what he make the update in real time
     async deleteProduct(id){
        let data = {
            id: id
        }

        let tab = [id]
        
        //Delete in real time
        for(var i = 0; i < this.state.data.length;i++){
            var obj = this.state.data[i];
            if(tab.indexOf(obj._id) !== -1){
               this.state.data.splice(i,1);
            }
        }

        await this.props.dispatch(showProduct(this.state.data));
        this.setState({data: this.state.data});
        this.listArtcile();
        serviceProduct.deleteProduct(data);
    }

    formAddProduct(){
        return(
            <div>
                <Form onSubmit={this.addArticle}>
                    <Form.Group>
                        <Form.Label>Article</Form.Label>
                        <Form.Control type="text" name="article" placeholder="Enter article" />
                        <Form.Label>Describe</Form.Label>
                        <Form.Control type="text" name="describe" placeholder="Enter describe" />
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" placeholder="Enter price" />
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" name="quantity" placeholder="Enter quantity" />
                        <Form.Label>Photo</Form.Label>
                        <Form.Control type="file" name="photo" placeholder="Enter Photo" />
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" placeholder="Enter category" />
                    </Form.Group>
                    <Button type="submit">Send</Button>
                </Form>
            </div>
        )
    }
    render(){
        return(
            <div>
                {this.formAddProduct()}
                <table>
                {this.state.displayThead &&
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>article</th>
                            <th>describe</th>
                            <th>price</th>
                            <th>quantity</th>
                            <th>photo</th>
                            <th>category</th>
                        </tr>
                        
                    </thead>}
                    <tbody>
                        {this.state.listArtcile}
                    </tbody>
                </table>
                
            </div>
        )
    }
}

function mapstateToProps(state){
    return { products: state.product};   
}

export default connect(mapstateToProps, null)(Product)

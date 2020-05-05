import React from "react";
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';




export const ListCard = async (data, endPoint) => {  
    let list;
    switch(endPoint.type){
        case "all":
            list = displayAll(data, endPoint)
        break;
        case "filter":
            list = displayByCategory(data, endPoint)
        break;
        case "searcharticle":
            list = displayByArticlesSearch(data, endPoint)
        break;
        case "sort":
            list = displayBySort(data, endPoint)
        break;
        case "article":
            list = displayOneArticle(data, endPoint)
        break;
        default:
        return null

    }
    return list;
}

function cardProduct(value, index){
    return (
        <Card className="border border-secondary mt-3 mr-3" key={index} style={{ width: '13em' }}>
            <Card.Img variant="pic" src={window.location.origin + "/img/" + value.photo}  style={{ width: "auto", height: "200px" }}/>
            <Card.Body>
                <Link  to={"/article/"+value._id} className="p-0 text-dark">{value.article}</Link>
                <Card.Text>{value.price}$</Card.Text>
                <Card.Text>description: {value.describe}</Card.Text>
                <Button variant="primary">Add cart</Button>
            </Card.Body>
        </Card>
    )  
}

function describeProduct(value, index){
    return (
        <Container className="border border-secondary mt-3 mr-3" key={index} >
            <Col></Col>
            <Row>
                <Col lg={4}><img src={window.location.origin + "/img/" + value.photo} style={{ width: '15em' }}/></Col>
                <Col>
                    <Row>
                        <Col lg={12}><p>{value.article}</p></Col>
                        <Col lg={12}><p>{value.describe}</p></Col>
                        <Col>                
                            <Button variant="primary">Add cart</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

    )  
}

async function displayAll(data, endPoint){
    let list = await data.map((value, index) => {
    if(endPoint.category === (undefined || "all")){
        return cardProduct(value, index);    
        }
    });
    return list;
}

async function displayByCategory(data, endPoint){
    let list = await data.map((value, index) => {
        
            if(endPoint.category === value.category){
                return cardProduct(value, index);     
            }
            else if(endPoint.category === "all"){
                return cardProduct(value, index);     
            }
        });

        return list
}

async function displayByArticlesSearch(data, endPoint){
    let list = await data.map((value, index) => {
            if(endPoint.category === value.article.toLowerCase()){
                return cardProduct(value, index);     
            }
        });

        return list;
}

async function displayBySort(data, endPoint){
    let dataSort;
    let list;
        dataSort = await data;
        let sort = await data.sort((a, b) =>  a.price - b.price );

        if(endPoint.category === "low" ) {dataSort = sort} 
        else if(endPoint.category === "high") {dataSort = sort.reverse()}
    
         list = await dataSort.map((value, index) => {
            return cardProduct(value, index);  
        });
    

    return list
}

async function displayOneArticle(data, endPoint){
    let list = await data.map((value, index) => {
            if(endPoint.category === value._id){
                return describeProduct(value, index);     
            }
        });
        return list;
}
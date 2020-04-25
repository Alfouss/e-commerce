import React from "react";
import {Card, Button} from 'react-bootstrap';

export const ListCard = async (data, endPoint) => {  
    let list;

    switch(endPoint.type){
        case "all":
            list = displayAll(data, endPoint)
        break;
        case "filter":
            list = displayByCategory(data, endPoint)
        break;
        case "article":
            list = displayByArticle(data, endPoint)
        break;
        case "sort":
            list = displayBySort(data, endPoint)
        break;
        default:
        return null

    }
    return list;
}

async function displayAll(data, endPoint){
    let list = await data.map((value, index) => {
        if(endPoint.category === (undefined || "all")){
                return (
                    <Card className="border border-secondary mt-3 mr-3" key={index} style={{ width: '13em' }}>
                        <Card.Img variant="pic" src={window.location.origin + "/img/" + value.photo}  style={{ width: "auto", height: "200px" }}/>
                        <Card.Body>
                            <Card.Title>{value.article}</Card.Title>
                            <Card.Text>{value.price}$</Card.Text>
                            <Card.Text>description: {value.article} blablablablablablablablablalba</Card.Text>
                            <Button variant="primary">Add cart</Button>
                        </Card.Body>
                    </Card>
                )    
            }
        });
        return list;
}

async function displayByCategory(data, endPoint){
    let list = await data.map((value, index) => {
        
        if(endPoint.category === value.category){
                return (
                    <Card className="border border-secondary mt-3 mr-3" key={index} style={{ width: '13em' }}>
                        <Card.Img variant="pic" src={window.location.origin + "/img/" + value.photo}  style={{ width: "auto", height: "200px" }}/>
                        <Card.Body>
                            <Card.Title>{value.article}</Card.Title>
                            <Card.Text>{value.price}$</Card.Text>
                            <Card.Text>description: {value.article} blablablablablablablablablalba</Card.Text>
                            <Button variant="primary">Add cart</Button>
                        </Card.Body>
                    </Card>
                )    
            }
            else if(endPoint.category === "all"){
                return (
                    <Card className="border border-secondary mt-3 mr-3" key={index} style={{ width: '13em' }}>
                        <Card.Img variant="pic" src={window.location.origin + "/img/" + value.photo}  style={{ width: "auto", height: "200px" }}/>
                        <Card.Body>
                            <Card.Title>{value.article}</Card.Title>
                            <Card.Text>{value.price}$</Card.Text>
                            <Card.Text>description: {value.article} blablablablablablablablablalba</Card.Text>
                            <Button variant="primary">Add cart</Button>
                        </Card.Body>
                    </Card>
                )   
            }
        });

        return list
}

async function displayByArticle(data, endPoint){
    let list = await data.map((value, index) => {
        if(endPoint.category === value.article.toLowerCase()){
                return (
                    <Card className="border border-secondary mt-3 mr-3" key={index} style={{ width: '13em' }}>
                        <Card.Img variant="pic" src={window.location.origin + "/img/" + value.photo}  style={{ width: "auto", height: "200px" }}/>
                        <Card.Body>
                            <Card.Title>{value.article}</Card.Title>
                            <Card.Text>{value.price}$</Card.Text>
                            <Card.Text>description: {value.article} blablablablablablablablablalba</Card.Text>
                            <Button variant="primary">Add cart</Button>
                        </Card.Body>
                    </Card>
                )    
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
                return (
                    <Card className="border border-secondary mt-3 mr-3" key={index} style={{ width: '13em' }}>
                        <Card.Img variant="pic" src={window.location.origin + "/img/" + value.photo}  style={{ width: "auto", height: "200px" }}/>
                        <Card.Body>
                            <Card.Title>{value.article}</Card.Title>
                            <Card.Text>{value.price}$</Card.Text>
                            <Card.Text>description: {value.article} blablablablablablablablablalba</Card.Text>
                            <Button variant="primary">Add cart</Button>
                        </Card.Body>
                    </Card>
                )
        });
    

    return list
}


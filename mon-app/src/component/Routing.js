import React from "react";
import Accueil from "./Accueil";
import Cart from "./Cart";
import {withRouter} from "react-router-dom";


//Routing

class Routing extends React.Component{  
    routeToComponent(){
        
        const params = this.props.match.params;
        if(params.type === "filter" ){
            return <Accueil params={params}/>         
        }
        else if(params.type === "searcharticle"){
            return <Accueil params={params}/>
        }
        else if(params.type === "sort"){
            return <Accueil params={params}/>
        }
        else if(params.type === "article"){
            return <Accueil params={params}/>
        }
        else if(params.type === "cart"){
            return <Cart params={params}/>
        }
        else{
            return <Accueil params={{category:"all", type:"all"}}/>
        }
    }

    render(){
        return(
            <div>
                {this.routeToComponent()}
            </div>
        )
    }
}

export default withRouter(Routing)
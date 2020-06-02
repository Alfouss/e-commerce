import React from "react";
import { connect } from "react-redux";
import SearchArticle from "./SearchArticle";


class NavbarMenu extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <SearchArticle products={this.props.products}/>
        )
    }
}

function mapStateToProps(state)  {
    return {
        products: state.product
    }
}

export default connect(mapStateToProps, null)(NavbarMenu);
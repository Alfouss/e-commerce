import React from "react"
import {connect} from "react-redux"

class SearchArtcile extends React.Component{
    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    async componentDidMount(){
       let products =  await this.props.products;
       this.setState({ data: products });
       this.listData();
    }

    async listData(article = null) {
        

    }


}

const mapStateToProps = (state) =>{
    return {
        products: state.product
    }
}

export default connect(mapStateToProps, null)(SearchArtcile);
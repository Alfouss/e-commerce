import * as actionType from "../actions/actionType";
import { combineReducers } from "redux";
import {allDataProducts}  from  "../services/serviceProduct";
import {allDataUsers}  from  "../services/serviceUser";

// Switch user 
const reducer_user = async (state = allDataUsers(), action) => {
    let newState;
    switch(action.type){
        case actionType.SHOW_USER:
            newState = action.data;
            return newState;
        default:
        return state;
    }
}

//Switch product
const reducer_product = async (state = allDataProducts(), action) => {
    let newState;
    switch(action.type){
        case actionType.SHOW_PRODUCT:
            newState = action.data;
            return newState;
        default:
        return state;
    }
}

const reducer_cart = async (state = [], action) => {
    let newState;
    switch(action.type){
        case actionType.SHOW_CART:
            return state;
        case actionType.ADD_CART:
            newState = action.data;
            return newState;
        case actionType.DELETE_CART:
            newState = action.data;
        return newState;
        default:
        return state;
    }
}


const userApp = combineReducers({
    user: reducer_user,
    product: reducer_product,
    cart: reducer_cart
})



export default userApp;
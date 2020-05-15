import * as actionType from './actionType'

export const showUser = (data) => ({
        type: actionType.SHOW_USER,
        data: data
    })


export const showProduct = (data) => ({
    type: actionType.SHOW_PRODUCT,
    data: data
})

export const showCart = (data) => ({
    type: actionType.SHOW_CART,
    data: data
})

export const addProductInCart = (data) => ({
    type: actionType.ADD_CART,
    data: data
})

export const deleteArticleFromCart = (data) => ({
    type: actionType.DELETE_CART,
    data: data
})
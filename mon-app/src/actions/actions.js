import * as actionType from './actionType'

export const showUser = (data) => ({
        type: actionType.SHOW_USER,
        data: data
    })


export const showProduct = (data) => ({
    type: actionType.SHOW_PRODUCT,
    data: data
})
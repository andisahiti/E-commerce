import axios from 'axios'
import * as actionTypes from './actionTypes'

export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_CART
    }
}

export const addToRedux = (payload) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: payload
    }

}

export const addToCart = (id, body) => {

    return dispatch => {
        dispatch(loadingStart())
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/addToCart?productId=${id}&type=single`, { userId: body.userId }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + body.token
            }
        }).then(res => {
            dispatch(addToRedux(res))
        }).catch(err => {
            alert('You are unauthorized to add products')
        })
    }


}


export const getCart = (data) => {

    return dispatch => {
        dispatch(loadingStart())
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/getCart`, { userId: data.userId }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.token
            }
        }).then(res => {

            dispatch(addToRedux(res.data))
        }).catch(err => {
            alert(err)
        })
    }



}

export const addToReduxItems = (payload) => {
    return {
        type: actionTypes.GET_CART_ITEMS,
        payload: payload
    }

}




export const getCartItems = (cartItems, userCart) => {

    return dispatch => {
        dispatch(loadingStart())
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/product/getItems`, { cartItems: cartItems }).then(response => {
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })
            dispatch(addToReduxItems(response.data))

        }).catch(err => {
            alert(err)
        })
    }


}

export const reduxRemove = (payload) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        payload: payload
    }
}


export const removeCartItem = (data) => {
    return async dispatch => {
        dispatch(loadingStart())
        const request = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/removeFromCart`, { userId: data.userId, productId: data.productId }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.token
            }
        })
            .then(response => {
                response.data.cart.forEach(item => {
                    response.data.cartDetail.forEach((k, i) => {
                        if (item.id === k._id) {
                            response.data.cartDetail[i].quantity = item.quantity
                        }
                    })
                })

                return response.data;

            }).catch(err => {
                alert(err)
            });
        dispatch(reduxRemove(request))
    }

}



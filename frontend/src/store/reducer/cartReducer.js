import * as actionTypes from '../action/actionTypes'


const initialState = {
    loading: false,
    userData: {
        cart: null
    },
    cartDetail: null,
    total: 0,
    count: 0
}


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return {
                ...state, userData: {
                    ...state.userData,
                    cart: action.payload
                },
                loading: false,
                count: state.userData.length
            }
        case actionTypes.GET_CART_ITEMS:
            let total = 0;

            action.payload.map(item => {
                total += parseInt(item.price, 10) * item.quantity
            });

            return {
                ...state,
                cartDetail: action.payload,
                loading: false,
                total: total,
                count: action.payload.length
            }
        case actionTypes.LOADING_CART:
            return {
                ...state,
                loading: true
            }
        case actionTypes.REMOVE_ITEM:
            let totalR = 0;

            action.payload.cart.map(item => {
                totalR += parseInt(item.price, 10) * item.quantity
            });
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                },
                count: action.payload.cart.length,
                total: totalR,
                loading: false
            }

        default:
            return state;
    }
}


export default cartReducer;
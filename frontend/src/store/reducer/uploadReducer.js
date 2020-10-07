import * as actionTypes from '../action/actionTypes'

const initialState = {
    title: '',
    description: '',
    price: 0,
    option: '1',
    loading: false,
    error: null,
}

const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TITLE_VALUE:
            return {
                ...state,
                title: action.event.target.value
            }
        case actionTypes.PRICE_VALUE:
            return {
                ...state,
                price: action.event.target.value
            }
        case actionTypes.DESCRIPTION_VALUE:
            return {
                ...state,
                description: action.event.target.value
            }
        case actionTypes.OPTION_VALUE:
            return {
                ...state,
                option: action.event.target.value
            }
        case actionTypes.LOADING_UPLOAD:
            return {
                ...state,
                loading: true
            }
        case actionTypes.UPLOAD_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.UPLOAD_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                title: '',
                description: '',
                price: 0,
                option: '1',
            }

        default:
            return state;
    }
}


export default uploadReducer;
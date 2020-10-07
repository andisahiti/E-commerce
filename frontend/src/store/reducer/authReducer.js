import * as actionTypes from '../action/actionTypes'
const initialState = {
    token: null,
    userId: null,
    error: null,
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    surname: '',
    role: 0,
    loading: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EMAIL_VALUE:
            return {
                ...state,
                email: action.event.target.value
            }
        case actionTypes.LOADING_AUTH:
            return {
                ...state,
                loading: true
            }
        case actionTypes.NAME_VALUE:
            return {
                ...state,
                name: action.event.target.value
            }
        case actionTypes.SURNAME_VALUE:
            return {
                ...state,
                surname: action.event.target.value
            }

        case actionTypes.PASSWORD_VALUE:
            return {
                ...state,
                password: action.event.target.value
            }
        case actionTypes.PASSWORD_REPEAT_VALUE:
            return {
                ...state,
                repeatPassword: action.event.target.value
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false,
                role: action.role
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                email: '',
                password: '',
                name: '',
                surname: '',
            }
        default:
            return state;
    }
}


export default loginReducer;








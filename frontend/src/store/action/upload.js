import axios from 'axios'
import * as actionTypes from './actionTypes'




export const titleValue = (event) => {
    return {
        type: actionTypes.TITLE_VALUE,
        event: event

    }
}

export const descriptionValue = (event) => {
    return {
        type: actionTypes.DESCRIPTION_VALUE,
        event: event

    }
}

export const priceValue = (event) => {
    return {
        type: actionTypes.PRICE_VALUE,
        event: event

    }
}

export const optionValue = (event) => {
    return {
        type: actionTypes.OPTION_VALUE,
        event: event

    }
}

export const authSuccess = () => {
    return {
        type: actionTypes.UPLOAD_SUCCESS,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.UPLOAD_FAIL,
        error: error
    };
};

export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_UPLOAD
    }
}
export const uploadProduct = (token, data) => {

    let url;
    return async dispatch => {
        const authData = {
            title: data.title,
            description: data.description,
            price: data.price,
            images: data.images,
            types: data.types
        };
        let response;
        let responseData;


        url = `${process.env.REACT_APP_BACKEND_URL}/api/product/uploadProduct`;
        dispatch(loadingStart())
        try {
            response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(authData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
            })
        } catch (error) {
            return dispatch(authFail('Internal server Error!'))

        }
        responseData = await response.json();

        if (!response.ok) {
            return dispatch(authFail(responseData.message))
        }

        return dispatch(authSuccess())
    }


};


import * as actionTypes from './actionTypes'

export const emailValue = (event) => {
    return {
        type: actionTypes.EMAIL_VALUE,
        event: event

    }
}
export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_AUTH
    }
}
export const passwordValue = (event) => {
    return {
        type: actionTypes.PASSWORD_VALUE,
        event: event

    }
}
export const passwordRepeatValue = (event) => {
    return {
        type: actionTypes.PASSWORD_REPEAT_VALUE,
        event: event

    }
}
export const nameValue = (event) => {
    return {
        type: actionTypes.NAME_VALUE,
        event: event

    }
}
export const surnameValue = (event) => {
    return {
        type: actionTypes.SURNAME_VALUE,
        event: event

    }
}

export const authSuccess = (token, userId, role) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        role: role
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const auth = (isSignup, auth, remember) => {

    let url;
    return async dispatch => {
        const authData = {
            email: auth.email,
            password: auth.password,
            name: auth.name,
            surname: auth.surname
        };
        let response;
        let responseData;
        if (isSignup) {

            url = `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`;
            dispatch(loadingStart())
            try {
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(authData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            } catch (error) {
                return dispatch(authFail('Internal server Error!'))

            }
            responseData = await response.json();

            if (!response.ok) {
                return dispatch(authFail(responseData.message))
            }

        } else if (!isSignup) {

            url = `${process.env.REACT_APP_BACKEND_URL}/api/users/login`;

            try {
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(authData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            } catch (error) {
                return dispatch(authFail('Internal server Error!'))

            }
            responseData = await response.json();

            if (!response.ok) {
                return dispatch(authFail(responseData.message))
            }
        }
        if (remember) {
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('userId', responseData.userId);
            localStorage.setItem('role', responseData.role);
        }
        return dispatch(authSuccess(responseData.token, responseData.userId, responseData.role))
    }


};



export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const autoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId, role));
        }
    }
};
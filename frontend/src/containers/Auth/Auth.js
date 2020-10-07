import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import Signup from './auth-mode/Signup'
import * as action from '../../store/action/index'
import './Auth.css'
import LoadingSpinner from '../../components/Loader/LoadingSpinner'


const Auth = (props) => {

    const [isSignup, setSignUp] = useState(false);
    const [remember, setRemember] = useState(false);


    const submitHandler = (event) => {
        const authData = {
            name: props.nameValue,
            surname: props.surnameValue,
            email: props.emailValue,
            password: props.passwordValue
        }
        event.preventDefault();
        props.auth(isSignup, authData, remember);

    }

    const switchAuthModeHandler = () => {
        setSignUp(prevState => !prevState)

    }


    let label = 'Sign In'
    let switchLabel = 'Sign up now.'
    let questionLabel = 'New here?'
    if (isSignup) {
        label = 'Sign Up'
        switchLabel = 'Sign in now.'
        questionLabel = 'Already a user?'
    }
    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to='/' />
    }

    return (
        <React.Fragment>
            {props.loading && <LoadingSpinner asOverlay />}
            <div className="login">
                <form className="signin-form" onSubmit={submitHandler}>
                    <h1 className="title">{label}</h1>
                    <p style={{
                        color: 'red'
                    }}>{props.error ? props.error : null}</p>
                    <Signup show={isSignup} />
                    <button disabled={false} className="signin-btn">{label}</button>
                    <div className="action-group">
                        <label  >
                            <input
                                checked={remember}
                                onChange={() => {
                                    return !remember ? setRemember(true) : setRemember(false)
                                }}
                                type="checkbox" className="checkbox"

                                id="remember-me" /> Remember me</label>
                    </div>
                    <div className="onboarding" >
                        <p >{questionLabel} <a onClick={switchAuthModeHandler}>{switchLabel}</a></p>

                    </div>
                </form>
                {authRedirect}
            </div>
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error,
        emailValue: state.auth.email,
        passwordValue: state.auth.password,
        nameValue: state.auth.name,
        surnameValue: state.auth.surname,
        loading: state.auth.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, isSignup, remember) => dispatch(action.auth(email, password, isSignup, remember))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));

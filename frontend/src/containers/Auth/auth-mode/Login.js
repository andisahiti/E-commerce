import React, { useState } from 'react'
import { connect } from 'react-redux'
import Input from '../../../components/Input/Input'
import * as action from '../../../store/action/index'

function Login(props) {
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    return (
        <React.Fragment>
            <Input
                blur={() => {
                    if (!validateEmail(props.emailValue)) {
                        setEmailValid(true)
                    }
                }}
                focus={() => {
                    setEmailValid(false)
                }}

                change={event => {
                    event.persist()
                    props.email(event)
                }}
                type='text'
                valid={emailValid}
                label='Email'

            >Enter a valid email</Input>
            <Input
                blur={() => {
                    if (props.passwordValue.length < 6) {
                        setPasswordValid(true)
                    }
                }}
                focus={() => {
                    setPasswordValid(false)
                }}

                change={event => {
                    event.persist()
                    props.password(event)
                }}
                type='password'
                valid={passwordValid}
                label='Password'
            >Password must be between 6 and 20 characters long</Input>
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        emailValue: state.auth.email,
        passwordValue: state.auth.password
    }
}
const mapDispatchToProps = dispatch => {
    return {
        email: (event) => dispatch(action.emailValue(event)),
        password: (event) => dispatch(action.passwordValue(event)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

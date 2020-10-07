import React, { useState } from 'react'
import { connect } from 'react-redux';
import Input from '../../../components/Input/Input'
import * as action from '../../../store/action/index'
import Login from './Login';

function Signup(props) {
    const [nameValid, setNameValid] = useState(false);
    const [surnameValid, setSurnameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    return (
        <React.Fragment>
            {props.show && <React.Fragment>
                <Input
                    blur={() => {
                        if (props.nameValue.length < 3) {
                            setNameValid(true)
                        }
                    }}
                    focus={() => {
                        setNameValid(false)
                    }}

                    change={event => {
                        event.persist()
                        props.name(event)
                    }}
                    type='text'
                    valid={nameValid}
                    label='Name'

                >Name must be between 3 and 20 characters long</Input>
                <Input
                    blur={() => {
                        if (props.surnameValue.length < 3) {
                            setSurnameValid(true)
                        }
                    }}
                    focus={() => {
                        setSurnameValid(false)
                    }}

                    change={event => {
                        event.persist()
                        props.surname(event)
                    }}
                    type='text'
                    valid={surnameValid}
                    label='Surname'

                >Name must be between 3 and 20 characters long</Input>
            </React.Fragment>}
            <Login />
            {props.show && <Input
                blur={() => {
                    if (props.passwordRepeatValue !== props.passwordValue) {
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
                label='Confirm Password'

            >Passwords do not match</Input>}
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        nameValue: state.auth.name,
        surnameValue: state.auth.surname,
        passwordRepeatValue: state.auth.repeatPassword,
        passwordValue: state.auth.password,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        name: (event) => dispatch(action.nameValue(event)),
        surname: (event) => dispatch(action.surnameValue(event)),
        password: (event) => dispatch(action.passwordRepeatValue(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

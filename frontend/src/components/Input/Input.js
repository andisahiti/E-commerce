import React from 'react'

function Input(props) {
    return (
        <div className="field">
            <input
                onBlur={props.blur}
                onFocus={props.focus}
                onChange={props.change} type={props.type} className={`text-input ${props.valid ? ' invalid' : null}`} required />
            <span className="floating-label test">{props.label}</span>
            {props.valid ? <p className='error-message'>{props.children}</p> : null}
        </div>
    )
}

export default Input

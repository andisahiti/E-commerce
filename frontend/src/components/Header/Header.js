import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Header.css'
import * as action from '../../store/action/index'
import { Icon, Badge } from 'antd';
function Header(props) {




    let authenticated = (
        <React.Fragment>
            <NavLink to='/upload' className='navbar__links' exact>Upload</NavLink>
            <Badge count={props.userData.cart ? props.userData.cart.length : 0}>
                <NavLink
                    to='/cart' className='navbar__links' exact><Icon type='shopping-cart' style={{
                        fontSize: 30
                    }} /></NavLink>
            </Badge>
            <NavLink onClick={props.logout} to='/login' className='navbar__links' exact>Logout</NavLink>
        </React.Fragment>
    )

    if (!props.role) {
        authenticated = (
            <React.Fragment>
                <Badge count={props.userData.cart ? props.userData.cart.length : 0}>
                    <NavLink
                        to='/cart' className='navbar__links' exact><Icon type='shopping-cart' style={{
                            fontSize: 30
                        }} /></NavLink>
                </Badge>
                <NavLink onClick={props.logout} to='/login' className='navbar__links' exact>Logout</NavLink>

            </React.Fragment>
        )
    }

    if (!props.isAuthenticated) {
        authenticated = (<React.Fragment>
            <NavLink className='navbar__links' to='/login' exact>Authentication</NavLink>
        </React.Fragment>)
    }

    return (
        <header className="navbar">
            <div className="navbar__left">

                <NavLink className='navbar__links' to='/' exact>Home</NavLink>
            </div>
            <div className="navbar__right">
                {authenticated}
            </div>

        </header>
    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        role: state.auth.role,
        userData: state.cart.userData,
        user: state.cart,
        count: state.cart.count
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(action.logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)

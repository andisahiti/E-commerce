import React, { useEffect } from 'react'
import UserCardBlock from './Section/UserCardBlock';
import { Empty } from 'antd';
import { connect } from 'react-redux';
import * as action from '../../store/action/index'
import LoadingSpinner from '../../components/Loader/LoadingSpinner';

function CartPage(props) {

    useEffect(() => {
        props.getCart({
            userId: props.userId,
            token: props.token
        });
    }, [])

    useEffect(() => {

        let cartItems = [];
        if (props.userData && props.userData.cart) {
            if (props.userData.cart.length > 0) {
                //i marrum krejt id e produktev ncart
                props.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });

                props.getCartItems(cartItems, props.userData.cart);


            }
        }

    }, [props.userData])



    const removeFromCart = (productId) => {

        props.removeCartItem({
            productId: productId,
            userId: props.userId,
            token: props.token
        })
    }


    return (
        <React.Fragment>
            {props.loading && <LoadingSpinner asOverlay />}
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <h1>My Cart</h1>
                <div>

                    <UserCardBlock
                        products={props.cartDetail}
                        removeItem={removeFromCart}
                    />


                    {props.total ?
                        <div style={{ marginTop: '3rem' }}>
                            <h2>Total amount: ${props.total} </h2>
                        </div>
                        :
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <br />
                            <Empty description={false} />
                            <p>No Items In the Cart</p>

                        </div>
                    }
                </div>

            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.cart.userData,
        cartDetail: state.cart.cartDetail,
        total: state.cart.total,
        loading: state.cart.loading,
        userId: state.auth.userId,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCartItems: (items, data) => dispatch(action.getCartItems(items, data)),
        removeCartItem: (data) => dispatch(action.removeCartItem(data)),
        getCart: (data) => dispatch(action.getCart(data))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CartPage)

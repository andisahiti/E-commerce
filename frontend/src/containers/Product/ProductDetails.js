import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { connect } from 'react-redux'
import * as action from '../../store/action/index'
import LoadingSpinner from '../../components/Loader/LoadingSpinner'

function DetailProductPage(props) {

    const productId = props.match.params.productId
    const [Product, setProduct] = useState([])

    useEffect(() => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/product/getItems?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })

    }, [])

    const addToCartHandler = async (productId) => {

        props.addToCart(productId, {
            userId: props.userId,
            token: props.token
        })
        setTimeout(() => {
            props.history.push('/cart');
        }, 500)
    }

    return (
        <React.Fragment>
            {props.loading && <LoadingSpinner asOverlay />}
            <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1>{Product.title}</h1>
                </div>

                <br />

                <Row gutter={[16, 16]} >
                    <Col lg={12} xs={24}>
                        <ProductImage detail={Product} />
                    </Col>
                    <Col lg={12} xs={24}>
                        <ProductInfo
                            show={props.isAuthenticated}
                            addToCart={addToCartHandler}
                            detail={Product} />
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
        loading: state.cart.loading,
        isAuthenticated: state.auth.token !== null

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (id, userId) => dispatch(action.addToCart(id, userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetailProductPage)

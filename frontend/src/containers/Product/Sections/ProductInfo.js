import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import { withRouter } from 'react-router-dom';

function ProductInfo(props) {

    const [Product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }


    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price"> {Product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="View"> {Product.views}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {props.show ? <Button size="large" shape="round" type="danger"
                    onClick={addToCarthandler}
                >
                    Add to Cart
                    </Button> : <Button size="large" shape="round" type="danger"
                        onClick={() => {
                            props.history.push('/login')
                        }}
                    >
                        You must login to continue
                    </Button>}

            </div>
        </div>
    )
}

export default withRouter(ProductInfo)

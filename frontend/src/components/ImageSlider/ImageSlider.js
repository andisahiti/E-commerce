import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {
    return (
        <div>

            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', height: '200px' }}
                            src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt="productImage" />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider

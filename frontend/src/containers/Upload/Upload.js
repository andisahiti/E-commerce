import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import * as action from '../../store/action/index'
import FileUpload from './FileUpload';
import LoadingSpinner from '../../components/Loader/LoadingSpinner';



const { Title } = Typography;
const { TextArea } = Input;

const Types = [
    { key: 1, value: "Samsung" },
    { key: 2, value: "Iphone" },
    { key: 3, value: "Sony" },
    { key: 4, value: "Nokia" },
    { key: 5, value: "LG" },
    { key: 6, value: "Huawei" }
]

function UploadProductPage(props) {


    const [Images, setImages] = useState([])

    const onSubmit = async (event) => {
        event.preventDefault();

        const data = {
            title: props.titleValue,
            description: props.descriptionValue,
            price: props.priceValue,
            images: Images,
            types: props.optionValue,
        }

        if (!props.titleValue || !props.descriptionValue || !props.priceValue || !props.optionValue || !Images) {
            return alert('fields cant be empty')
        }
        try {
            await props.uploadProduct(props.token, data)

            props.history.push('/')


        } catch (error) {
            alert(error)
        }
    }
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    return (
        <React.Fragment>
            {props.loading && <LoadingSpinner asOverlay />}
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Title level={2}> Upload Travel Product</Title>
                </div>


                <Form onSubmit={onSubmit} >
                    <FileUpload refreshFunction={updateImages} />

                    <br />
                    <br />
                    {props.error && <p>{props.error}</p>}
                    <br />

                    <label>Title</label>
                    <Input
                        onChange={(e) => {
                            e.persist()
                            props.title(e)
                        }}
                        value={props.titleValue}
                    />
                    <br />
                    <br />
                    <label>Description</label>
                    <TextArea
                        onChange={(e) => {
                            e.persist()
                            props.description(e)
                        }}
                        value={props.descriptionValue}
                    />
                    <br />
                    <br />
                    <label>Price($)</label>
                    <Input
                        onChange={(e) => {
                            e.persist()
                            props.price(e)
                        }}
                        value={props.priceValue}
                        type="number"
                    />
                    <br /><br />
                    <select onChange={(e) => {
                        e.persist()
                        props.option(e)
                    }} value={props.optionValue}>
                        {Types.map(item => (
                            <option key={item.key} value={item.key}>{item.value} </option>
                        ))}
                    </select>
                    <br />
                    <br />

                    <Button
                        onClick={onSubmit}
                    >
                        Submit
                </Button>

                </Form>

            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        titleValue: state.upload.title,
        descriptionValue: state.upload.description,
        priceValue: state.upload.price,
        optionValue: state.upload.option,
        error: state.upload.error,
        loading: state.upload.loading,
        token: state.auth.token

    }
}
const mapDispatchToProps = dispatch => {
    return {
        title: (event) => dispatch(action.titleValue(event)),
        description: (event) => dispatch(action.descriptionValue(event)),
        price: (event) => dispatch(action.priceValue(event)),
        option: (event) => dispatch(action.optionValue(event)),
        uploadProduct: (token, data) => dispatch(action.uploadProduct(token, data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UploadProductPage)
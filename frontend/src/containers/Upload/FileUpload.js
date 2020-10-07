import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';



function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' },
            headers: { Authorization: "Bearer " + props.token }
        }
        formData.append("file", files[0])

        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/product/uploadImage`, formData, config)
            .then(response => {
                if (response.data.success) {

                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])


                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div style={{
                            width: '300px', height: '240px', border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                            {...getRootProps()}
                        >

                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />

                        </div>
                    )}
                </Dropzone>

                <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                    {Images.map((image, index) => (
                        <div key={index} onClick={() => onDelete(image)}>
                            <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt={`productImg-${index}`} />
                        </div>
                    ))}


                </div>

            </div>
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        loading: state.upload.loading,
        image: state.upload.image,
        token: state.auth.token

    }
}


export default connect(mapStateToProps)(FileUpload)

import React, { useCallback, useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import LoadingSpinner from '../components/Loader/LoadingSpinner';
import SortByName from '../components/SortByName/SortByName';
import { price, types } from '../components/Data/Data'
import SortByPrice from '../components/SortByPrice/SortByPrice'
import Search from '../components/Search/Search';
import { Link } from 'react-router-dom';


const { Meta } = Card;


function Home() {

    const [Products, setProducts] = useState([])
    //prej cilit index mi ja nis me skip
    const [Skip, setSkip] = useState(0)
    //sa copa mi marr permeniher
    const [Limit, setLimit] = useState(8)
    const [loading, setLoading] = useState(false)
    //nese i marrum 8 produkte ka mu show buttoni 
    const [PostSize, setPostSize] = useState();


    const [Filters, setFilters] = useState({
        price: [],
        price: []
    })

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(variables)

    }, [])

    const getProducts = (variables) => {
        setLoading(true)
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/product/getProducts`, variables)
            .then(response => {
                //kur e prekum loadmore
                if (variables.loadMore) {
                    setProducts([...Products, ...response.data.products])

                } else {
                    //per mos mi shtu perfuni po mi marr krejt qato produkte tfilturme prej filterArgs{}
                    setProducts(response.data.products)
                }
                //vjen lengthi prej backendit 
                setPostSize(response.data.postSize)
                setLoading(false)

            }).catch(err => {
                alert(err); setLoading(false)

            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(variables)
        setSkip(skip)
    }


    const renderCards = Products.map((product, index) => {

        return <Col key={index} lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<Link to={`/product/${product._id}`} > <ImageSlider images={product.images} /></Link>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })


    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getProducts(variables)
        setSkip(0)

    }

    const handlePrice = (value) => {

        //mi marr qmimet qe jon narray nData
        const data = price;
        let array = [];

        for (let key in data) {
            //value osht indeksi i radio butonit
            if (data[key]._id === parseInt(value, 10)) {
                // e marrum arrayn e pricav
                array = data[key].array;
            }
        }
        return array
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters };
        //me dit cilen array me shti sene price pse types
        newFilters[category] = filters;

        if (category === "price") {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;

        }

        //i marrum prej db tfiltrum
        showFilteredResults(newFilters);
        setFilters(newFilters);
    }

    const updateSearchTerms = useCallback((newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setTimeout(() => {
            getProducts(variables)
        }, 1000)
    }, [])


    return (
        <React.Fragment>
            {loading && <LoadingSpinner asOverlay />}
            <div style={{ width: '75%', margin: '3rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>  Best deals in the market  <Icon type="shopping" />  </h2>
                </div>

                <Row gutter={[16, 16]}>
                    <Col lg={12} xs={24} >
                        <SortByName
                            list={types}
                            handleFilters={filters => handleFilters(filters, "types")}
                        />
                    </Col>
                    <Col lg={12} xs={24}>
                        <SortByPrice
                            list={price}
                            handleFilters={filters => handleFilters(filters, "price")}
                        />
                    </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                    <Search
                        refreshFunction={updateSearchTerms}
                    />

                </div>
                {Products.length === 0 ?
                    <div style={{ objectFit: 'contain', display: 'flex', height: '350px', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>No post yet...</h2>
                    </div> :
                    <div>
                        <Row gutter={[16, 16]}>

                            {renderCards}

                        </Row>


                    </div>
                }
                <br /><br />
                {PostSize >= Limit &&
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button style={{
                            cursor: 'pointer',
                            fontSize: '17px'
                        }} onClick={onLoadMore}>Load More</button>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default Home

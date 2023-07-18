import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout/Layout";
import axios from "axios";
import {Checkbox, Radio} from "antd";
import {Prices} from "../components/Prices";
import {useNavigate} from "react-router-dom";
import {useCart} from "../context/cart";
import {toast} from "react-toastify";


const HomePage = () => {
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    /** get All Category */
    const getAllCategory = async () => {
        try {
            const {data} = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);


    /** Get All Products */
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false)
            setProducts(data.products);
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };

    /** get Total Count */
    const getTotal = async () => {
        try {
            const {data} = await axios.get('/api/v1/product/product-count');
                setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, []);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);


    /** Handle Filter Checked Box */
    const handleFilter = (value, id) => {
        let all = [...checked]

        if (value) {
            all.push(id)
        } else {
            all = all.filter(c => c !== id)
        }
        setChecked(all);
    };

    /** Get Filtered Product data */

    const filterProduct = async () => {
        try {
            const {data} = await axios.post('/api/v1/product/product-filters', {checked, radio});
            setProducts(data?.products)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title={"All Products - Best Offers"}>
            <div className="row">
                <div className="col-md-2" style={{borderRight:'1px solid gray'}}>

                    {/* Category vise Filter */}
                    <h4 className='ps-4 mt-3'>Filter By Category</h4>
                    <hr className='ms-2'/>
                    <div className="d-flex flex-column">
                        {categories.map(c => (
                            <Checkbox
                                className='ps-4 fs-6'
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>

                    {/* Price vise Filter */}
                    <h4 className='ps-4 mt-4'>Filter By Prices($)</h4>
                    <hr className='ms-2'/>
                    <div className="d-flex flex-column">
                        <Radio.Group
                            className='ps-4 fs-6'
                            onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map(p => (

                                <div key={p._id}>
                                    <Radio value={p.array}>
                                        {p.name}
                                    </Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>

                    <div className="mt-5 text-center">
                        <button
                            className='btn btn-danger w-75'
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>

                    </div>

                </div>
                <div className="col-md-10">
                   {/* {JSON.stringify(radio, null, 4)}*/}
                    <h1 className='text-center'>All Products</h1>
                    <hr/>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                        {products?.map(p => (
                            <div key={p._id} className="card m-2 border  shadow border-info rounded-5"
                                 style={{width: '18rem', height: '25rem'}}>
                                <img src={`/api/v1/product/product-photo/${p._id}`}
                                     className="card-img-top  mt-2 "
                                     alt={p.name}
                                     style={{
                                         height:'11rem',
                                         width:'12rem',
                                         margin:'auto',
                                }}
                                />
                                <hr className={'m-2'}/>
                                <div className="card-body">
                                    <h5 className="card-title">{p.name.substring(0,20)}</h5>
                                    <small className="card-text">{p.description.substring(0,30)}...</small>
                                    <br/>
                                    <h1 className="card-text badge badge-pill badge-danger mt-2 fs-5"> $ {p.price}</h1>
                                    <div className={'pt-2'}>
                                        <button
                                            className="btn btn-info btn-sm me-1"
                                            onClick={()=>{
                                                navigate(`/product/${p.slug}`)
                                            }}
                                        >More Details
                                        </button>

                                        <button
                                            className="btn btn-primary btn-sm ms-1"
                                            onClick={()=> {
                                                setCart([...cart,p])
                                                //Create & set Cart items to save in local Storage using JSON Array format
                                                localStorage.setItem('cart',JSON.stringify([...cart,p]));

                                                toast.success('Item Added to Cart ✅')
                                            }}
                                        >
                                            Add To Cart
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='m-2 p-3 text-center'>
                        {products && products.length<total && (
                            <button className='btn btn-warning' onClick={
                                (e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }
                            }>
                                {loading ? "Loading ..." : "Load-more"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;

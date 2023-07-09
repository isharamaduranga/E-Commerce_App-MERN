import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout/Layout";
import axios from "axios";
import {Checkbox, Radio} from "antd";
import {Prices} from "../components/Prices";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);


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
    }, []);

    /** Get All Products */
    const getAllProducts = async () => {
        try {
            const {data} = await axios.get('/api/v1/product/get-product');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    }

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

                </div>
                <div className="col-md-10">
                   {/* {JSON.stringify(radio, null, 4)}*/}
                    <h1 className='text-center'>All Products</h1>
                    <div className="d-flex flex-wrap justify-content-evenly">
                        {products?.map(p => (
                            <div key={p._id} className="card m-2 border border-1 shadow" style={{width: '20rem'}}>
                                <img src={`/api/v1/product/product-photo/${p._id}`}
                                     className="card-img-top"
                                     alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0,60)} ...</p>
                                    <h1 className="card-text badge badge-pill badge-danger fs-4"> $ {p.price}</h1>
                                    <div>
                                        <button className="btn btn-info ms-1">More Details</button>
                                        <button className="btn btn-primary ms-1">Add To Cart</button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </Layout>
    );
};

export default HomePage;

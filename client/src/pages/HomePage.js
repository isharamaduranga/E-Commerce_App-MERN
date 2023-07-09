import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout/Layout";
import {useAuth} from "../context/auth";
import axios from "axios";
import {Checkbox} from "antd";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const HomePage = () => {
    const[products,setProducts]=useState([]);
    const[categories,setCategories]=useState([]);
    const[checked,setChecked]=useState([]);


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

    useEffect(()=>{
        getAllProducts();
        },[]);


    const handleFilter = (value,id) => {
        let all = [...checked]

        if (value) {
            all.push(id)
        }else{
            all = all.filter( c => c!== id)
        }
        setChecked(all);
    };

    return (
        <Layout title={"All Products - Best Offers"}>
            <div className="row mt-3">
                <div className="col-md-2">
                    <h4 className='text-center'> Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories.map(c => (
                            <Checkbox
                                className='ps-4 fs-6'
                                key={c._id}
                                onChange={(e)=> handleFilter(e.target.checked,c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                </div>
                <div className="col-md-10">
                    {JSON.stringify(checked,null,4)}

                    <h1 className='text-center'>All Products</h1>
                    <div className="d-flex flex-wrap gap-4">
                        {products?.map(p => (
                                <div key={p._id} className="card m-2 border border-1 shadow" style={{width: '20rem'}}>
                                    <img  src={`/api/v1/product/product-photo/${p._id}`}
                                          className="card-img-top"
                                          alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <div>
                                            <button  className="btn btn-info ms-1">More Details</button>
                                            <button  className="btn btn-primary ms-1">Add To Cart</button>
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

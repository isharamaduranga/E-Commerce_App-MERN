import React, {useEffect, useState} from 'react';
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios"
import {Link} from 'react-router-dom'

const Products = () => {

    const [products, setProducts] = useState([]);

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
        getAllProducts();

    }, []);

    return (<Layout>
        <div className="container-fluid  p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9" style={{ borderLeft: '1px solid gray' }}>
                    <h1 className='text-center'>All Products List</h1>
                    <div className="d-flex flex-wrap justify-content-md-center gap-4">
                        {products?.map(p => (

                            <Link
                                key={p._id}
                                to={`/dashboard/admin/product/${p.slug}`}
                                className='product_link'
                            >
                                <div className="card m-2 border border-1 shadow border-info" style={{width: '20rem'}}>
                                    <img  src={`/api/v1/product/product-photo/${p._id}`}
                                          className="card-img-top"
                                          alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0,30)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </Layout>);
};

export default Products;

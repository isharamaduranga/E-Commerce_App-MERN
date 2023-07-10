import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout/Layout";
import axios from "axios";
import {useParams} from "react-router-dom";


const ProductDetails = () => {

    const params = useParams();
    const [product, setProduct] = useState({});

    //initial data
    useEffect(() => {
        if (params?.slug) getProducts();
    }, [params?.slug]);


    //get products
    const getProducts = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <Layout>
            <h1 className='text-center mt-2'>Product Details</h1>
            <div className="row mt-3 me-5 ms-5 p-4 shadow-lg border-1 border-success rounded-4">
                <div className="col-md-4 p-5 border border-1 rounded-4">
                        <img src={`/api/v1/product/product-photo/${product._id}`}
                             className="card-img-top"
                             alt={product.name}
                        />
                </div>
                <div className="col-md-8 mt-3 ps-5">
                    <pre><h5><span className='text-warning'>Name        : </span>{product.name}</h5></pre>
                    <pre><h5><span className='text-warning'>Description : </span>{product.description}</h5></pre>
                    <pre><h5><span className='text-warning'>Price       : </span>{`${product.price} $`}</h5></pre>
                    <pre><h5><span className='text-warning'>Category    : </span>{`${product.slug}`}</h5></pre>
                    <pre><h5><span className='text-warning'>Quantity    : </span>{`${product.quantity}`}</h5></pre>

                    <button className='btn btn-success mt-3'>ADD TO CART</button>
                </div>
            </div>

        </Layout>
    );
};

export default ProductDetails;

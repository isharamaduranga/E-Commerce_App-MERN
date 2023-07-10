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
            <div className="row">
                <h1 className='text-center mt-2 mb-5'>Product Details</h1>
                <div className="col-md-5">
                        <img src={`/api/v1/product/product-photo/${product._id}`}
                             className="card-img-top"
                             width={200}
                             alt={product.name}
                        />
                </div>
                <div className="col-md-7 mt-3">
                    <pre><h5><span className='text-warning'>Name        : </span>{product.name}</h5></pre>
                    <pre><h5><span className='text-warning'>Description : </span>{product.description}</h5></pre>
                    <pre><h5><span className='text-warning'>Price       : </span>{`${product.price} $`}</h5></pre>
                    <pre><h5><span className='text-warning'>Category    : </span>{`${product.slug}`}</h5></pre>
                    <pre><h5><span className='text-warning'>Quantity    : </span>{`${product.quantity}`}</h5></pre>

                        <button className='btn btn-success mt-3'>ADD TO CART</button>
                </div>
            </div>

            <div className="row">
                Similar products
            </div>
        </Layout>
    );
};

export default ProductDetails;

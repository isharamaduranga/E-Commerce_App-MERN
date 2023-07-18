import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout/Layout";
import axios from "axios";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useCart} from "../context/cart";


const ProductDetails = () => {

    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [cart, setCart] = useCart();

    //initial data
    useEffect(() => {
        if (params?.slug) getProducts();
    }, [params?.slug]);


    //get products
    const getProducts = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)

            //calling related product in initial time
            getSimilarProduct(data?.product._id, data?.product.category._id);

        } catch (error) {
            console.log(error);
        }
    }

    //get Similar Product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProduct(data?.products)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <h1 className='text-center pt-3'>Product Details</h1>
            <hr/>
            <div className="d-flex align-items-center justify-content-center ">
                <div className=" p-4  shadow-lg border border-1 border-secondary rounded-5"
                     style={{width: '65vw'}}
                >
                    <div className="row pe-4 ps-4 ">
                        <div className="col-md-4 p-5 border border-1 border-info rounded-5">
                            <img src={`/api/v1/product/product-photo/${product._id}`}
                                 className="card-img-top"
                                 alt={product.name}
                            />
                        </div>
                        <div className="col-md-8 mt-3 ps-5">
                            <h6 className='pt-4'>
                                <span className='text-warning'>Name        : </span>{product.name}
                            </h6>
                            <h6 className='pt-4'>
                                <span className='text-warning'>Description : </span>{product.description}
                            </h6>
                            <h6 className='pt-4'>
                                <span className='text-warning'>Price       : </span>{`${product.price} $`}
                            </h6>
                            <h6 className='pt-4'>
                                <span className='text-warning'>Category    : </span>{`${product?.category?.name}`}
                            </h6>
                            <h6 className='pt-4'>
                                <span className='text-warning'>Quantity    : </span>{`${product.quantity}`}
                            </h6>
                            <h6 className='pt-4'>
                                <div>
                                    <button
                                        className='btn btn-success m-auto mt-5 w-50'
                                        onClick={() => {
                                            setCart([...cart, product])
                                            //Create & set Cart items to save in local Storage using JSON Array format
                                            localStorage.setItem('cart', JSON.stringify([...cart, product]));

                                            toast.success('Item Added to Cart ✅')
                                        }}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>

            <hr/>

            <div className='row'>
                <h2 className='text-center mt-3'>Similar Product</h2>
                {relatedProduct.length < 1 && (<h6 className='text-center mt-2'>No Similar Product Found !!! 😥</h6>)}
                <div className="d-flex flex-wrap  justify-content-md-center gap-2">
                    {relatedProduct?.map(p => (
                        <div key={p._id} className="card m-2 border  shadow border-info rounded-5"
                             style={{width: '18rem', height: '27rem'}}>
                            <img src={`/api/v1/product/product-photo/${p._id}`}
                                 className="card-img-top mt-2"
                                 alt={p.name}
                                 style={{
                                     height: '11rem',
                                     width: '12rem',
                                     margin: 'auto',
                                 }}
                            />
                            <hr className={'m-2'}/>
                            <div className="card-body">
                                <h5 className="card-title">{p.name.substring(0, 20)}</h5>
                                <p className="card-text">{p.description.substring(0, 50)} ...</p>
                                <h1 className="card-text badge badge-pill badge-danger mt-2 fs-5"> $ {p.price}</h1>
                                <div className='pt-2 text-center'>
                                    <button
                                        className="btn btn-primary btn-sm me"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            //Create & set Cart items to save in local Storage using JSON Array format
                                            localStorage.setItem('cart', JSON.stringify([...cart, p]));

                                            toast.success('Item Added to Cart ✅')
                                        }}
                                    >Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>

    );
};

export default ProductDetails;

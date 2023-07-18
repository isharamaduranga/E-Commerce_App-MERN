import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout/Layout";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useCart} from "../context/cart";

const CategoryProduct = () => {
    const navigate=useNavigate();
    const params = useParams();
    const [cart, setCart] = useCart();
    const[product,setProduct]=useState([]);
    const[category,setCategory]=useState([]);

        //get products and category
        const getProductsByCategory = async () => {
            try {
                const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`);
                setProduct(data?.products)
                setCategory(data?.category)

            } catch (error) {
                console.log(error);
            }
        }

    useEffect(() => {
        if (params?.slug) getProductsByCategory();
    }, [params?.slug]);

    return (
        <Layout>
            <div className="container mt-3">
                <h1 className={'text-center'}>Category - {category?.name}</h1>
                <h5 className={'text-center'}>{product?.length} results Found...😍</h5>
                <hr/>
                <div className="d-flex flex-wrap  justify-content-md-center gap-2">
                    {product?.map(p => (
                        <div key={p._id} className="card m-2 border  shadow border-info rounded-5"
                             style={{width: '18rem', height: '25rem'}}>
                            <img src={`/api/v1/product/product-photo/${p._id}`}
                                 className="card-img-top mt-2"
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

                                    <button className="btn btn-primary btn-sm me-1"
                                        onClick={()=> {
                                        setCart([...cart,p])
                                        //Create & set Cart items to save in local Storage using JSON Array format
                                        localStorage.setItem('cart',JSON.stringify([...cart,p]));

                                        toast.success('Item Added to Cart ✅')
                                    }}
                                        >
                                        Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryProduct;

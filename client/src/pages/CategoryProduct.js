import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout/Layout";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";

const CategoryProduct = () => {
    const navigate=useNavigate();
    const params = useParams();
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
                <div className="d-flex flex-wrap  justify-content-md-center gap-5">
                    {product?.map(p => (
                        <div key={p._id} className="card m-2 border border-1 border-info shadow" style={{width: '20rem'}}>
                            <img src={`/api/v1/product/product-photo/${p._id}`}
                                 className="card-img-top"
                                 alt={p.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0,33)}...</p>
                                <h1 className="card-text badge badge-pill badge-danger fs-4"> $ {p.price}</h1>
                                <div>
                                    <button
                                        className="btn btn-info ms-1"
                                        onClick={()=>{
                                            navigate(`/product/${p.slug}`)
                                        }}
                                    >More Details
                                    </button>

                                    <button className="btn btn-primary ms-1">Add To Cart</button>
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

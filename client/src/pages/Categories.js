import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import {Link} from "react-router-dom";
import image from '../assets/cat1.png'
const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={'All Categories'}>
            <div className="container">
                <div className="d-flex flex-row justify-content-evenly flex-wrap">
                    {categories.map(c => (
                        <div key={c._id} className=" mt-5 mb-3 gx-3 gy-3">
                                <Link to={`/category/${c.slug}`}>
                                    <div className="card border border-success shadow" style={{width: '15rem',height:'17rem'}}>
                                        <img src={image} className="card-img-top" alt={c.name}/>
                                            <div className="card-body">
                                                <h4 className={'text-center'}>{c.name}</h4>
                                            </div>
                                    </div>

                                </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;

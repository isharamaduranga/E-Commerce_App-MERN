import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import {Link} from "react-router-dom";
const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={'All Categories'}>
            <div className="container">
                <div className="row">
                    {categories.map(c => (
                        <div key={c._id} className="col-md-6 mt-5 mb-3 gx-3 gy-3">
                                <Link
                                    className='badge rounded-pill bg-warning fs-6'
                                    to={`/category/${c.slug}`}
                                >
                                    {c.name}
                                </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;

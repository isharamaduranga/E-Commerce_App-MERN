import React from 'react';
import Layout from "../components/Layout/Layout";
import {useSearch} from "../context/search";

const Search = () => {
    const[values,setValues]=useSearch();

    return (
        <Layout>
                <div className="container">
                    <div className="text-center">
                        <h1>Search Results</h1>
                        <h5>{values?.results.length<1 ?
                            'No Product Found 😥!!!' :
                            `Found ${values?.results.length} Results ...`}</h5>

                        <div className="d-flex flex-wrap mt-5 justify-content-md-center gap-5">
                            {values?.results.map(p => (
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

export default Search;

import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout/Layout";
import axios from "axios";
import {useParams} from "react-router-dom";


const ProductDetails = () => {

    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);

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
            <h1 className='text-center mt-2'>Product Details</h1>
            <div className="row justify-content-center  mt-3">

                <div className="w-75 p-4 shadow-lg border border-1 border-secondary rounded-5">
                    <div className="row pe-4 ps-4 ">
                        <div className="col-md-4 p-5 border border-1 border-info rounded-5">
                            <img src={`/api/v1/product/product-photo/${product._id}`}
                                 className="card-img-top"
                                 alt={product.name}
                            />
                        </div>
                        <div className="col-md-8 mt-3 ps-5">
                            <pre><h6 className='fs-5'>
                                <span className='text-warning'>Name        : </span>{product.name}
                            </h6></pre>
                            <pre><h6 className='fs-5'>
                                <span className='text-warning'>Description : </span>{product.description}
                            </h6></pre>
                            <pre><h6 className='fs-5'>
                                <span className='text-warning'>Price       : </span>{`${product.price} $`}
                            </h6></pre>
                            <pre><h6 className='fs-5'>
                                <span className='text-warning'>Category    : </span>{`${product?.category?.name}`}
                            </h6></pre>
                            <pre><h6 className='fs-5'>
                                <span className='text-warning'>Quantity    : </span>{`${product.quantity}`}
                            </h6></pre>

                            <button className='btn btn-success mt-3'>ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>

            <hr/>

            <div className='row'>
                <h2 className='text-center mt-3'>Similar Product</h2>
                {relatedProduct.length < 1 && (<h6 className='text-center mt-2'>No Similar Product Found !!! 😥</h6>)}
                <div className="d-flex flex-wrap  justify-content-md-center gap-5">
                    {relatedProduct?.map(p => (
                        <div key={p._id} className="card m-2 border border-1 border-info shadow"
                             style={{width: '20rem'}}>
                            <img src={`/api/v1/product/product-photo/${p._id}`}
                                 className="card-img-top"
                                 alt={p.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 50)} ...</p>
                                <h1 className="card-text badge badge-pill badge-danger fs-4"> $ {p.price}</h1>
                                <div className='text-center'>
                                    <button className="btn btn-success ms-1">Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
        /* <Layout>
             <h1 className='text-center mt-2'>Product Details</h1>
             <div className="row justify-content-center mt-3">
                 <div className="w-75 p-4 shadow-lg border border-1 border-secondary rounded-4">
                     <div className="row">
                         <div className="col-md-4 p-5 border border-1 border-info rounded-4">
                             <img
                                 src={`/api/v1/product/product-photo/${product._id}`}
                                 className="card-img-top"
                                 alt={product.name}
                             />
                         </div>
                         <div className="col-md-8 mt-3 ps-5">
           <pre>
             <h5>
               <span className='text-warning'>Name        : </span>
                 {product.name}
             </h5>
           </pre>
                             <pre>
             <h5>
               <span className='text-warning'>Description : </span>
                 {product.description}
             </h5>
           </pre>
                             <pre>
             <h5>
               <span className='text-warning'>Price       : </span>
                 {`${product.price} $`}
             </h5>
           </pre>
                             <pre>
             <h5>
               <span className='text-warning'>Category    : </span>
                 {`${product?.category?.name}`}
             </h5>
           </pre>
                             <pre>
             <h5>
               <span className='text-warning'>Quantity    : </span>
                 {`${product.quantity}`}
             </h5>
           </pre>

                             <button className='btn btn-success mt-3'>ADD TO CART</button>
                         </div>
                     </div>
                 </div>
             </div>

             <hr />

             <div className='row'>
                 <h2 className='text-center mt-3'>Similar Product</h2>
                 {relatedProduct.length < 1 && (
                     <h6 className='text-center mt-2'>No Similar Product Found !!! 😥</h6>
                 )}
                 <div className="d-flex flex-wrap justify-content-md-center gap-5">
                     {relatedProduct?.map(p => (
                         <div
                             key={p._id}
                             className="card m-2 border border-1 border-info shadow"
                             style={{ width: '20rem' }}
                         >
                             <img
                                 src={`/api/v1/product/product-photo/${p._id}`}
                                 className="card-img-top"
                                 alt={p.name}
                             />
                             <div className="card-body">
                                 <h5 className="card-title">{p.name}</h5>
                                 <p className="card-text">{p.description.substring(0, 60)} ...</p>
                                 <h1 className="card-text badge badge-pill badge-danger fs-4">
                                     $ {p.price}
                                 </h1>
                                 <div className='text-center'>
                                     <button className="btn btn-success ms-1">Add To Cart</button>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         </Layout>*/

    );
};

export default ProductDetails;

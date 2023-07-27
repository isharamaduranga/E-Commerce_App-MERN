import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import {useAuth} from "../../context/auth";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
            const {data} = await axios.get("/api/v1/auth/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return (<Layout title={'Your Orders'}>

            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>

                    <div className="col-md-9">
                        <h1 className="text-center">All Orders</h1>
                        {orders?.map((o, i) => {
                            return (
                                <div>
                                    <div className={'shadow-lg rounded-5 mb-5 me-5'}>
                                        <table className="table  table-bordered table-hover table-responsive">
                                            <thead className='text-bg-secondary'>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col"> date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div className="container-fluid p-5">
                                            {o?.products?.map((p, i) => (
                                                <div className="row mb-2 p-3 card flex-row rounded-5  border border-info" key={p._id}>
                                                    <div className="col-md-3 text-center">
                                                        <img
                                                            src={`/api/v1/product/product-photo/${p._id}`}
                                                            className="card-img-top"
                                                            alt={p.name}
                                                            style={{width:'80px',height:'80px'}}
                                                        />
                                                    </div>
                                                    <div className="col-md-9 border-start border-dark">
                                                        <p className='m-0'>{p.name}</p>
                                                        <p className='m-0'>{p.description.substring(0, 30)}</p>
                                                        <p className='m-0'>Price : {p.price} $</p>
                                                    </div>
                                                </div>))}
                                        </div>

                                    </div>

                                </div>);
                        })}
                    </div>
                </div>
            </div>

        </Layout>);
};

export default Orders;

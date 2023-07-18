import React from 'react';
import Layout from "../components/Layout/Layout";
import {useAuth} from "../context/auth";
import {useCart} from "../context/cart";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CartPage = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const navigate = useNavigate();

    // Remove Cart items
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index,1)
            setCart(myCart)
            //Reset local storage when remove item in cart
            localStorage.setItem('cart',JSON.stringify(myCart));

        } catch (error) {
            console.log(error);
        }
    };

    //Find Total Price
    const totalPrice = () => {
      try {
          let total = 0;

          cart.map(item=>{
              total+=item.price;
          })
          return total.toLocaleString('en-US',{
              style:'currency',
              currency:"USD"
          })
      }catch (error) {
          console.log(error)
      }
    }


    return (<Layout>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello ${auth?.token && auth.user?.name} 👋`}
                        </h1>
                        <h5 className="text-center text-success">
                            {cart?.length > 1 ? `You Have ${cart.length} items in Your Cart 
                                ${auth?.token ? "" : "Please login to Checkout !!"}` : "Your Cart is Empty 😥"}
                        </h5>
                    </div>
                </div>

                <div className="row mt-2">

                    <div
                        className="col-md-6 mt-1 border border-info rounded-5 p-3"
                        style={{overflowY:'scroll' , height:'63vh'}}>
                        {cart?.map(p => (
                            <div className='row mb-2 flex-row p-2 ms-4 me-4 border border-warning shadow rounded-5'>
                                <div key={p._id} className="col-md-3 border-end">
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        style={{height:'120px'}}
                                    />
                                </div>
                                <div className='col-md-9 mt-1 ps-5'>
                                    <h6 className=' fw-bold text-dark'>{p.name}</h6>
                                    <small>{p.description.substring(0,45)}</small>
                                    <p className=' text-primary m-1'>Price : {p.price}$</p>
                                    <button
                                        className='btn btn-sm btn-danger'
                                        onClick={()=>
                                            removeCartItem(p._id)
                                    }
                                    >Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-6  text-center">
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr/>
                        <h5>Total :<span className='text-danger'> {totalPrice()}</span></h5>
                    </div>
                </div>

            </div>
        </Layout>);
};

export default CartPage;

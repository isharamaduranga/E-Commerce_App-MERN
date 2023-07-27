import React from 'react';
import {NavLink} from "react-router-dom";
import {BiSolidUserCircle} from "react-icons/bi";

const AdminMenu = () => {
    return (<>
        <div className='text-center '>
            <div className="list-group pt-5 pe-3 ps-3">
                <div className='text-center'>
                    <BiSolidUserCircle className="pb-1 text-primary text-center" size="70px"/>
                </div>
                <h4>Admin Panel</h4>
                <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create
                    Category</NavLink>
                <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create
                    Product</NavLink>
                <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
                    Products</NavLink>
                <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
                    Orders</NavLink>
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
            </div>
        </div>
    </>);
};

export default AdminMenu;

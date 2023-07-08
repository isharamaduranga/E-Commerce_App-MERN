import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import {toast} from 'react-toastify';
import axios from "axios";

const CreateCategory = () => {
    const [categories, setCategories] = useState([])

    /** get All Category */
    const getAllCategory = async () => {
        try {

            const {data} = await axios.get('/api/v1/category/get-category')
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong !!!')
        }
    }

    useEffect(() => {
        getAllCategory();

    }, []);

    var count = 0;

    return (<Layout title={'DashBoard - Create Category'}>
        <div className="container-fluid  p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'> Manage Category </h1>
                    <div className='w-100'>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                categories?.map((c) => (
                                    <tr>
                                        <td>{++count}</td>
                                        <td key={c._id}>{c.name}</td>
                                        <td>
                                            <button className="btn btn-primary">Edit</button>
                                        </td>
                                    </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </Layout>);
};

export default CreateCategory;

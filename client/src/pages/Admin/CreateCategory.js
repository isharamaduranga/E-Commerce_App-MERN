import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import {toast} from 'react-toastify';
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import {Modal} from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState([""]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    /** Handle Form*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/v1/category/create-category', {
                name,
            });

            if (data?.success) {
                toast.success(`${name} is Created ...`);
                setName("");
                getAllCategory();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong In input form !!!')
        }
    };

    /** get All Category */
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategory();

    }, []);

    /** Update Category */
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                toast.success(`${updatedName} is updated ...`);
                setSelected(null);
                setUpdatedName("");
                setOpen(false);
                getAllCategory();

            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong In Update !!!')
        }
    };

    /**delete category */
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${pId}`
            );
            if (data.success) {
                toast.success(`category is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };


    var count = 0;

    return (
        <Layout title={'DashBoard - Create Category'}>
        <div className="container-fluid  p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9 ps-5 pe-5" style={{ borderLeft: '1px solid gray' }} >
                    <h1 className='text-center'> Manage Category </h1>
                    <div className="p-3 w-75">

                        <CategoryForm
                            handleSubmit={handleSubmit}
                            value={name}
                            setValue={setName}
                        />
                    </div>
                    <div className='w-75'>
                        <table className="table table-hover table-responsive ms-5">
                            <thead className='bg-light'>
                            <tr>
                                <th scope="col">#No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories?.map((c) => (
                                <>
                                    <tr>
                                        <td>{++count}</td>
                                        <td key={c._id}>{c.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary ms-2"
                                                onClick={() => {
                                                    setOpen(true);
                                                    setUpdatedName(c.name);
                                                    setSelected(c);
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger ms-2"
                                                onClick={()=>{handleDelete(c._id)}}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal
                        onCancel={() => setOpen(false)}
                        footer={null}
                        open={open}
                    >
                        <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} />
                    </Modal>
                </div>
            </div>
        </div>

    </Layout>);
};

export default CreateCategory;

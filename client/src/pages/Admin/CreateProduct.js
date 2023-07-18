import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import {toast} from 'react-toastify';
import axios from "axios";
import {Select} from 'antd'
import {useNavigate} from "react-router-dom";
const {Option} = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");

    /** get All Category */
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategory();

    }, []);

    //Create Product

    const handleProduct = async (e) => {
        e.preventDefault();
      try {
          const productData = new FormData();
          productData.append("name",name)
          productData.append("description",description)
          productData.append("price",price)
          productData.append("quantity",quantity)
          productData.append("photo",photo)
          productData.append("category",category)


          const {data} = axios.post(
              '/api/v1/product/create-product',
              productData);

          if (data?.success) {
              toast.error(data?.message);
          }else{
              toast.success('Product Added Successfully ...');
              navigate("/dashboard/admin/products");
              window.location.reload()
          }

      }catch (error) {
          console.log(error);
          toast.error('Something went wrong');
      }
    }

    return (
        <Layout title={'DashBoard - Create Product'}>
            <div className="container-fluid  p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9 " style={{ borderLeft: '1px solid gray' }} >
                        <h1 className='text-center pt-1 pb-1'> Create Product</h1>
                        <hr/>

                        <div className='row'>
                            <div className="col-md-6">
                                <div className="m-1">
                                    <Select
                                        bordered={false}
                                        placeholder="Select a Category"
                                        size='large'
                                        showSearch
                                        className ='form-select mb-3 text-dark'
                                        onChange={(value)=>{setCategory(value)}}
                                    >
                                        {categories?.map(c =>(
                                            <Option key={c._id} value={c._id}>
                                                {c.name}
                                            </Option>

                                        ))}
                                    </Select>
                                    <div className="mb-3">
                                        <input
                                            type='text'
                                            value={name}
                                            placeholder='Input a Name'
                                            className='form-control text-dark'
                                            onChange={(e)=>
                                                setName(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type='text'
                                            value={description}
                                            placeholder='Input a Description'
                                            className='form-control text-dark'
                                            onChange={(e)=>
                                                setDescription(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type='number'
                                            value={price}
                                            placeholder='Input a Price of Product'
                                            className='form-control text-dark'
                                            onChange={(e)=>
                                                setPrice(e.target.value)
                                            }
                                        ></input>
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type='number'
                                            value={quantity}
                                            placeholder='Input a Quantity'
                                            className='form-control text-dark'
                                            onChange={(e)=>
                                                setQuantity(e.target.value)
                                            }
                                        ></input>
                                    </div>

                                    <div className="mb-3">
                                        <Select
                                            bordered={false}
                                            placeholder="Select a Shipping"
                                            size='large'
                                            showSearch
                                            className ='form-select mb-3 text-dark'
                                            onChange={(value)=>{setShipping(value)}}
                                        >
                                            <Option value="0">No</Option>
                                            <Option value="1">Yes</Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="btn btn-outline-secondary col-md-12">
                                        { photo ? photo.name : "Upload Photo"}
                                        <input
                                            className='text-dark'
                                            type="file"
                                            name="photo"
                                            accept="image/*"
                                            onChange={(e)=> setPhoto(e.target.files[0])}
                                            hidden
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    { photo && (
                                        <div className='text-center'>
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt="product_photo"
                                                height={'200px'}
                                                className='img img-responsive'
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="mt-5 text-center">
                            <button
                                className='btn btn-success w-50'
                                onClick={handleProduct}
                            >
                                ADD PRODUCT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>);
};

export default CreateProduct;

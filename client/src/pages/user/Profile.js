import React, {useState,useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import {useAuth} from "../../context/auth";
import axios from "axios";
import {toast} from "react-toastify";

const Profile = () => {
    //auth
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get all user data
    useEffect(() => {
        // Check if the auth.user object exists before destructuring
            const { email, name, phone, address } = auth?.user;
            setName(name);
            setPhone(phone);
            setEmail(email);
            setAddress(address);

    }, [auth?.user]);


    //form handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {data} = await axios.put(
                '/api/v1/auth/profile',
                {name,email,password,phone,address,}
            );
            if(data?.error){
                toast.error(data?.error);
            }else{
                setAuth({...auth, user: data?.updatedUser})
                let item = localStorage.getItem("auth");
                item = JSON.parse(item)
                item.user = data.updatedUser;
                localStorage.setItem('auth',JSON.stringify(item));
                toast.success('Profile Updated Successfully..');
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong !!!');
        }
    }


    return (
        <Layout title={'Your Profile'}>

            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">

                        <div className="register">
                            <form className="form_area  rounded-5 pt-3 pb-4 ps-5 pe-5 bg-white" onSubmit={handleSubmit}>

                                <h2 className="text-center" style={{letterSpacing: "3px"}}> USER PROFILE </h2>
                                <div className="mb-2">
                                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputName"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="exampleInputEmail" className="form-label">E-Mail</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled
                                    />
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputPhone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputAddress"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>


                                <div className="text-center">
                                    <button type="submit" className="btn btn-success w-50">UPDATE</button>
                                </div>


                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Profile;

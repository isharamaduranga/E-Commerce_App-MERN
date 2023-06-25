import React, {useState} from 'react';
import Layout from "../../components/Layout/Layout";
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom'
import axios from "axios";
import SnackBar from "../../components/SnackBar/SnackBar";
const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [showSnackBar, setShowSnackBar] = useState(false);

    //form handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                '/api/v1/auth/register',
                {name,email,password,phone,address}
                );
            if (res && res.data.success) {
                setShowSnackBar(true); // Show the SnackBar

            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong !!!');
        }
    }
    const newMsg = <Link to="/login" className="link-warning">Go Login</Link>
    return (<Layout title="Register - E-Commerce App">
            <div className="register">
                <h2 style={{letterSpacing: "5px"}}> REGISTER PAGE </h2>

                <form
                    className="form_area shadow rounded-5 p-4"
                    onSubmit={handleSubmit}
                >
                    {/* Render SnackBar component if showSnackBar is true */}
                    {showSnackBar && <SnackBar severity="success" message="Registration successful!" linkMsg={newMsg} />}

                    <div className="mb-2">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
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
                            required
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
                            required
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
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputAddress"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Register</button>
                    </div>


                </form>
            </div>
        </Layout>

    );
};
export default Register;

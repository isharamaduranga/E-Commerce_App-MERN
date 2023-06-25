import React, {useState} from 'react';
import Layout from "../../components/Layout/Layout";
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import axios from "axios";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                '/api/v1/auth/login',
                {email,password}
            );
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/");

            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);

        }
    }

   // const newMsg = <Link to="/" className="link-warning">Home Page</Link>
    return (
        <Layout title="Register - E-Commerce App">
            <div className="register">
                <form className="form_area  rounded-5 pt-3 pb-4 ps-5 pe-5 bg-white" onSubmit={handleSubmit}>

                    <h2 className="text-center mt-5 mb-5" style={{letterSpacing: "3px"}}> LOGIN FORM </h2>

                    <div className="mb-3">
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

                    <div className="mb-3">
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

                    <div className="text-center">
                        <button type="submit" className="btn btn-success mt-4 mb-3 w-50">Login</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Login;

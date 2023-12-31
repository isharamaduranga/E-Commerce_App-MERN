import React, {useState} from 'react';
import Layout from "../../components/Layout/Layout";
import {toast} from 'react-toastify';
import {useNavigate,useLocation} from 'react-router-dom'
import axios from "axios";
import {useAuth} from "../../context/auth";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth]=useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                '/api/v1/auth/login',
                {email,password,
                });

            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token,
                });
                localStorage.setItem("auth",JSON.stringify(res.data));
                navigate(location.state || "/");
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong !!! ')
        }
    };

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
                        <button type="button"
                                className="btn btn-warning mt-4  w-75"
                                onClick={()=>{navigate('/forgot-password')}
                        }

                        >Forgot Password</button>

                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success mt-3 mb-4 w-75">Login</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Login;

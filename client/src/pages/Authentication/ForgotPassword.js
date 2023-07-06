import React, {useState} from 'react';
import Layout from "../../components/Layout/Layout";
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import axios from "axios";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                '/api/v1/auth/forgot-password',
                {email,newPassword,answer
                });

            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong !!! ')
        }
    };
    return (
        <Layout title={'Forgot Password E-Commerce App'}>

            <div className="register">
                <form className="form_area  rounded-5 pt-3 pb-4 ps-5 pe-5 bg-white" onSubmit={handleSubmit}>

                    <h2 className="text-center mt-5 mb-5" style={{letterSpacing: "3px"}}> RESET PASSWORD</h2>

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
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputAnswer" className="form-label">Enter Your Favorite Sport Name ?</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputAnswer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-info mt-3 mb-4 w-75">RESET</button>
                    </div>
                </form>
            </div>

        </Layout>
    );
};

export default ForgotPassword;

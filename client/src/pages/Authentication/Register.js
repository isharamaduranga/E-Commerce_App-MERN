import React, {useState} from 'react';
import Layout from "../../components/Layout/Layout";

const Register = () => {



    return (<Layout title="Register - E-Commerce App">
            <div className="register">
                <h2 style={{letterSpacing:"5px"}}> REGISTER  PAGE </h2>

                <form className="form_area shadow rounded-5 p-4">
                    <div className="mb-2">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputName"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="exampleInputEmail" className="form-label">E-Mail</label>
                        <input type="email" className="form-control" id="exampleInputEmail"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword"/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="exampleInputPhone"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputAddress"/>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Register</button>
                    </div>


                </form>

            </div>
        </Layout>);
};

export default Register;

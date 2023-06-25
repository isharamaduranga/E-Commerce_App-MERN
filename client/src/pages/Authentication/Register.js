import React, {useState} from 'react';
import Layout from "../../components/Layout/Layout";
import {toast} from 'react-toastify'

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //form handle submit
    const handleSubmit = (e) => {
      e.preventDefault()
        console.log(name,email,password,phone,address)
        toast.success('Register Successfully ...')
    }

    return (<Layout title="Register - E-Commerce App">
            <div className="register">
                <h2 style={{letterSpacing: "5px"}}> REGISTER PAGE </h2>

                <form
                    className="form_area shadow rounded-5 p-4"
                    onSubmit={handleSubmit}

                >
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

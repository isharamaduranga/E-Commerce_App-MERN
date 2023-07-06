import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Authentication/Register";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Authentication/Login";
import {ToastContainer} from "react-toastify";
import React from "react";
import DashBoard from "./pages/user/DashBoard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";

function App() {
    return (
        <>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>

                <Route path="/dashboard" element={<PrivateRoute/>}>
                    <Route path="user" element={<DashBoard/>}/>
                </Route>

                <Route path="/dashboard" element={<AdminRoute/>}>
                    <Route path="admin" element={<AdminDashBoard/>}/>
                </Route>

                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/policy" element={<Policy/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </>
    );
}

export default App;

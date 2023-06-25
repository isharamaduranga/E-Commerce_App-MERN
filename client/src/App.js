import {Routes,Route} from "react-router-dom";
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
function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<Register/>}/>
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

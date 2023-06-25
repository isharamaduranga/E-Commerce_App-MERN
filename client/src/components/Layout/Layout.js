import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {Helmet} from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({children, title, description, keywords, author}) => {
    return (<div>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <meta name="author" content={author}/>
            </Helmet>
            <Header/>
            <main style={{minHeight: '82.7vh'}}>
                <ToastContainer />
                {children}
            </main>
            <Footer/>

        </div>);
};

export default Layout;

Layout.defaultProps={
    title : "E-Commerce App - Shop Now",
    description:"Mern Stack E-Commerce App",
    keywords: "mern,react,node,mongodb",
    author:"Ishara Maduranga"
}
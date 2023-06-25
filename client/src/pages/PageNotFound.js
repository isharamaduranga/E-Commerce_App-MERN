import React from 'react';
import Layout from "../components/Layout/Layout";
import notFoundImg from "../assets/errorpage.webp";
import {Link} from 'react-router-dom'

const PageNotFound = () => {
    return (
        <Layout title={"Go Back - Page Not Found"}>
            <div className="text-center">
                <img className="not_found_image pt-5 w-25 h-25" src={notFoundImg} />
                <h3 className="pb-5">Oops ! Page Not Found !!!</h3>

                <Link to="/" className="pnf-btn">Go Back Home</Link>
            </div>

        </Layout>
    );
};

export default PageNotFound;

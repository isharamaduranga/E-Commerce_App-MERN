import React from 'react';
import {Link} from 'react-router-dom'
const Footer = () => {
    return (
        <div className="footer">

            <h6 className="text-center m-0"><small>All Right Reserved &copy; Ishara Maduranga</small> </h6>
            <p className="text-center m-0">
                <Link to="/about">About</Link>|
                <Link to="/contact">Contact</Link>|
                <Link to="/policy">Policy</Link>
            </p>

        </div>

    );
};

export default Footer;

import React from 'react';
import Layout from "../components/Layout/Layout";

const Contact = () => {
    return (
        <Layout title={"Contact Us "}>
            <section className="container ps-5 pe-5">

                <h2 className="h1-responsive font-weight-bold text-center pt-3">Contact us</h2>

                <p className="text-center w-responsive mx-auto ">Do you have any questions? Please don't hesitate to contact us directly. Our team will come back to you within
                    a matter of hours to help you.</p>

                <div className="row">
                    <div className="col-md-7 mb-md-0  form_bg bg-white shadow border border-info rounded-5">
                        <form id="contact-form" name="contact-form">


                            <div className="row">


                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input type="text" id="name" name="name" className="form-control"/>
                                            <label htmlFor="name" className="">Your name</label>
                                    </div>
                                </div>



                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input type="text" id="email" name="email" className="form-control"/>
                                            <label htmlFor="email" className="">Your email</label>
                                    </div>
                                </div>


                            </div>



                            <div className="row">
                                <div className="col-md-12">
                                    <div className="md-form mb-0">
                                        <input type="text" id="subject" name="subject" className="form-control"/>
                                            <label htmlFor="subject" className="">Subject</label>
                                    </div>
                                </div>
                            </div>



                            <div className="row">

                                <div className="col-md-12">

                                    <div className="md-form">
                                        <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea"></textarea>
                                        <label htmlFor="message">Your message</label>
                                    </div>

                                </div>
                            </div>


                        </form>

                        <div className="text-center text-md-left">
                            <a className="btn btn-primary" >Send</a>
                        </div>
                        <div className="status"></div>
                    </div>

                    <div className="col-md-5 text-center details_bg">
                        <ul className="list-unstyled mb-0">
                            <li><i className="fas fa-map-marker-alt fa-2x text-danger"></i>
                                <p>San Francisco, CA 94126, USA</p>
                            </li>

                            <li><i className="fas fa-phone mt-4 fa-2x text-success"></i>
                                <p>+ 01 234 567 89</p>
                            </li>

                            <li><i className="fas fa-envelope mt-4 fa-2x text-primary"></i>
                                <p>contact@ecommerce.com</p>
                            </li>
                        </ul>
                    </div>


                </div>

            </section>
        </Layout>
    );
};

export default Contact;

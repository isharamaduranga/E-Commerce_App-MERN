import React from 'react';
import Layout from "../components/Layout/Layout";
import aboutImg from '../assets/cus_a.png'

const About = () => {
    return (
        <Layout title={"About Us - E-Commerce App"}>
            <div className="container">
                <div className="row">

                    <div className="col-6 pt-5">
                        <img src={aboutImg} alt="about_page_image"/>
                    </div>

                    <div className="col-6 pt-5">
                        <h2 className="text-center mb-4">About Us ...</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consequuntur debitis
                            delectus dolorem esse excepturi incidunt iure necessitatibus nihil numquam officiis
                            omnis porro quas quibusdam quos sapiente sequi sit, totam unde vero. Ad eaque et facere
                            fuga impedit natus, praesentium? Alias at commodi consectetur doloremque eligendi in
                            incidunt laborum perspiciatis quos, recusandae rem rerum similique suscipit temporibus
                            veritatis. A, ad animi at culpa cupiditate deserunt eaque ex excepturi incidunt ipsam
                            laudantium maxime necessitatibus provident quia quidem reiciendis sunt suscipit tenetur,
                            voluptate voluptatum. Aliquid, aperiam at aut cum doloribus laboriosam optio quibusdam
                            voluptates. Ab atque dolore incidunt itaque laborum molestias odit quod reprehenderit
                            veritatis voluptates.!A, ad animi at culpa cupiditate deserunt eaque ex excepturi incidunt ipsam
                            laudantium maxime necessitatibus provident quia quidem reiciendis sunt suscipit tenetur,
                            voluptate voluptatum.A, ad animi at culpa cupiditate deserunt eaque ex excepturi incidunt ipsam
                            laudantium maxime necessitatibus provident quia quidem reiciendis sunt suscipit tenetur,
                            voluptate voluptatum.</p>
                    </div>

                </div>
            </div>
        </Layout>
    );
};
export default About;

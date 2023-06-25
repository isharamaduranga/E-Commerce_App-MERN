import React from 'react';
import Layout from "../components/Layout/Layout";
import privacyImg from "../assets/network.png";

const Policy = () => {
    return (
        <Layout title={"Privacy Policy"}>
            <div className="container">
                <div className="row">

                    <div className="col-6 pt-5 mt-5">
                        <img src={privacyImg} alt="privacy_page_image"/>
                    </div>

                    <div className="col-6 pt-5">
                        <h2 className="text-center mb-4">Privacy Policy</h2>
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

export default Policy;

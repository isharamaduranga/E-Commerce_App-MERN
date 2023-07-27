import React from 'react';
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";


const Users = () => {
    return (
        <Layout title={'DashBoard - All Users'}>
            <div className="container-fluid  p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9" style={{ borderLeft: '1px solid gray' }}>
                        <h1 className={'mt-2 text-center'}>All Users</h1>
                        <hr/>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Users;

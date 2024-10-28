import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../Context/auth'

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <h1>AdminDashboard</h1>
            <div className="container-fluid m-3 p-3 w-auto">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3 className=''>
                                Admin Name : {auth?.user?.name}
                            </h3>
                            <h3 className=''>
                                Admin Email : {auth?.user?.email}
                            </h3>
                            <h3 className=''>
                                Admin Contact : {auth?.user?.phone}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
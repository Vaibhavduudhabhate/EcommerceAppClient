import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
    return (
        <Layout title={"Dashboard - All users"}>
            <div className='container-fluid w-auto m-3 p-3'>
                <div className="row w-full">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h3>
                            All users
                        </h3>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users
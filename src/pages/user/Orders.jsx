import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'

const Orders = () => {
    return (
        <Layout title={"Your Orders"}>
            <div className="container-fluid p-3 m-3 w-auto">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        All Orders
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
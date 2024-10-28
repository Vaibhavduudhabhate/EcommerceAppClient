import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'

const Profiles = () => {
    return (
        <Layout title={"Your Profile"}>
        <div className="container-fluid p-3 m-3 w-auto">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <h1>Your Profile</h1>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default Profiles
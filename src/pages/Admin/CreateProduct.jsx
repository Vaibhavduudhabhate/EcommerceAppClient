import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const CreateProduct = () => {
  return (
    <Layout title={"Dashboard - All products"}>
         <div className='container-fluid w-auto m-3 p-3'>
        <div className="row w-full">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
            <h3>
            CreateProduct
            </h3>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct
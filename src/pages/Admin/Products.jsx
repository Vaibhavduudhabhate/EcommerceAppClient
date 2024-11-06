import React, {useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { Service_url } from '../../config/app.config'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


const Products = () => {
    const [ products ,setProducts] = useState("")

    const getAllProducts = async () => {
        try {
          const { data } = await axios.get(`${Service_url}/api/product/get-product`)
          if (data?.success) {
            setProducts(data?.products)
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong in getting Products List")
        }
      }
    
      useEffect(() => {
        getAllProducts()
      }, [])
      console.log(products)
  return (
    <Layout>
        <div className='container-fluid w-auto m-3 p-3'>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h3>All Products List</h3>
                    <div className="d-flex">
                    {products && products?.map(pro=>(
                      <Link key={pro._id} className='product_link' to={`/dashboard/admin/product/${pro.slug}`}>
                        <div className="card m-2" style={{ width: '18rem' }} >
                          <img src={`${Service_url}/api/product/product-photo/${pro._id}`} className="card-img-top" alt={pro.name} />
                          <div className="card-body">
                            <h5 className="card-title">{pro.name}</h5>
                            <p className="card-text">{pro.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products
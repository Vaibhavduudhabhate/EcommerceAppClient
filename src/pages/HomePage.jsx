import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Service_url } from '../config/app.config';
import { Link } from 'react-router-dom';
import {Checkbox} from 'antd';
import toast from 'react-hot-toast';
const HomePage = () => {
    const [products, setProducts] = useState("")
    const [categories, setCategories] = useState("")
    const [checked ,setChecked] = useState("")

    const getAllCategory = async () => {
        try {
          const { data } = await axios.get(`${Service_url}/api/category/all-category`)
          if (data?.success) {
            setCategories(data?.category)
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong in getting category")
        }
      }
    
      useEffect(() => {
        getAllCategory()
      }, [])

    const getAllProducts = async () => {
        try {
            const data = await axios.get(`${Service_url}/api/product/get-product`)
            setProducts(data.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    const handleFilter = async(value,id) =>{
        let all = [...checked];
        if(value){
            all.push(id)
        }else{
            all.filter((cat) => cat !== id)
        }
        setChecked(all)
    }

    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <>
            <Layout title={"Home page Ecommerce"}>
                <div className="row">
                    <div className="col-md-3">
                        <h5 className='text-center'>
                            Filter By Category
                        </h5>
                        <div className="d-flex flex-column">
                            {categories && categories.map((cat)=>(
                                <Checkbox key={cat._id} onChange={(e)=>handleFilter(e.target.checked,cat._id)}>
                                    {cat.name}
                                </Checkbox>
                            ))}
                        </div>

                    </div>
                    <div className="col-md-9">
                        {JSON.stringify(checked,null,4)}
                        <h3 className="text-center">
                            All Procucts
                        </h3>
                        <div className="d-flex flex-wrap">
                            {products && products?.map(pro => (
                                // <Link key={pro._id} className='product_link' to={`/dashboard/admin/product/${pro.slug}`}>
                                    <div className="card m-2" style={{ width: '18rem' }} >
                                        <img src={`${Service_url}/api/product/product-photo/${pro._id}`} className="card-img-top" alt={pro.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{pro.name}</h5>
                                            <p className="card-text">{pro.description}</p>
                                            <button className='btn btn-primary'>More Details</button>
                                            <button className='btn btn-secondary ms-1'>ADD TO CART</button>
                                        </div>
                                    </div>
                                // </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default HomePage
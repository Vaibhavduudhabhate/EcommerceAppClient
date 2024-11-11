import React,{useState,useEffect} from 'react'
import useCategory from '../Hooks/useCategory'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'


const Categories = () => {
    const category = useCategory()
  return (
    <Layout title={"All Categories"}>
        <div className='container'>
        <div className="row">
            {
                category && category.map((cat)=>(
                <div className="col-md-6">
                        <Link to="/" className='btn btn-primary m-2'>
                        {cat.name}
                        </Link>
                </div>
                ))
            }
        </div>
        </div>
    </Layout>
  )
}

export default Categories
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
const {Option} = Select


const CreateProduct = () => {
  const [categories ,setCategories] = useState([]);
  const [photo ,setPhoto] = useState("");
  const [name ,setName] = useState("");
  const [category ,setCategory] = useState([]);
  const [description ,setDescription] = useState("");
  const [price ,setPrice] = useState("");
  const [quantity ,setQuantity] = useState("");
  const [shipping ,setShipping] = useState("");

  const getAllCategory = async () => {
    try {
      // console.log(Service_url)
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
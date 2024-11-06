import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { Service_url } from '../../config/app.config';
import { useNavigate } from "react-router-dom";


const {Option} = Select


const CreateProduct = () => {
  const navigate = useNavigate();
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

   //create product function
   const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const  data  = await axios.post(
        `${Service_url}/api/product/create-product`,
        productData
      );
      console.log(data)
      if (data?.status === 200) {
        toast.error(data?.message);
      } else if(data?.status === 201){
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

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
            <div className="m-1 w-75">
              <Select variant={false} placeholder={"select a category"} showSearch size='large' className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
              {categories?.map((cat)=>(
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
              </Select>
              <div className="mb-3">
                <label className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : "Upload Photo"}
                  <input type="file" name="photo" id="" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden />
                </label>
              </div>
              <div className="mb-3">
                {
                  photo && (
                    <div className="text-center">
                      <img src={URL.createObjectURL(photo)} alt="product-photo" height={"200px"} className='img img-responsive' srcset="" />
                    </div>
                  ) 
                }
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  variant={false}
                  placeholder="Select Shipping "
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct
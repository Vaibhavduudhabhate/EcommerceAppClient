import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Service_url } from '../../config/app.config'
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from 'antd';

const CreateCategory = () => {

  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState("")
  const [visible, setVisible] = useState(false);

  const handleUpdate = async(e) =>{
    if (!selected) return;
    e.preventDefault();
    console.log(selected)

    try {
      const {data} = await axios.put(`${Service_url}/api/category/update-category/${selected._id}`,{name:updatedName})
      console.log(data)
      if (data.success) {
        toast.success(data.message);
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory()
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
    }
  }

  const handleDelete = async(id) =>{
    try {
      const {data} = await axios.delete(`${Service_url}/api/category/delete-category/${id}`)
      // console.log(data)
      if (data.success) {
        toast.success(data.message);
        getAllCategory()
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${Service_url}/api/category/create-category` ,{name})
      if (data?.success) {
        toast.success(`${name} Created Successfully.`)
        setName(""); 
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.status)
      if (error.status === 409) {
        toast.error("Category Already exists")
      }else{
        toast.error("something went wrong in input form.")
      }
    }
  }

  const getAllCategory = async () => {
    try {
      // console.log(Service_url)
      const { data } = await axios.get(`${Service_url}/api/category/all-category`)
      if (data.success) {
        setCategories(data.category)
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
    <Layout title={"Dashboard - All users"}>
      <div className='container-fluid w-auto m-3 p-3'>
        <div className="row w-full">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>
              Manage Category
            </h3>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  categories?.map(cat => (
                    <tr key={cat._id}>
                      <td>{cat.name}</td>
                      <td>
                        <button className="btn btn-warning me-3" onClick={()=>{setVisible(true);setUpdatedName(cat.name);setSelected(cat)}}>Edit</button>
                        <button className="btn btn-danger" onClick={()=>handleDelete(cat._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
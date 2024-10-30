import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Service_url } from '../../config/app.config'

const CreateCategory = () => {

  const [categories, setCategories] = useState([])

  const getAllCategory = async () => {
    try {
      console.log(Service_url)
      const { data } = await axios.get(`${Service_url}/api/category/all-category`)
      if (data.success) {
        setCategories(data)
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
              CreateCategory
            </h3>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
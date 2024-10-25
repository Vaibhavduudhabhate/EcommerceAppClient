import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Service_url } from '../../config/app.config';
import toast from 'react-hot-toast';
// import "../../styles/AuthStyles.css";


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(name,email,password,phone,address)
    // console.log(process.env.API)
    // toast("Wow so easy!");
    try {
      const res = await axios.post(`${Service_url}/api/register`,{name ,password,email,phone,address,answer});
      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        navigate("/login")
      }else{
        toast.error(res.data.message)
      }
      console.log(res)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <Layout title={"register - Ecommerce App"}>
      <div className="register ">
        <form onSubmit={handleSubmit}>
          <h4 className='mt-2'>Register Form</h4>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" aria-describedby="phoneHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAnswer" className="form-label">what is your favourite sports ?</label>
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer" aria-describedby="answerHelp" />
          </div>
          <button type="submit" className="btn btn-dark w-full" style={{width: "100%"}}>Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register
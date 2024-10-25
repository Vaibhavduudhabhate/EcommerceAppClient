import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate ,useLocation } from 'react-router-dom';
import { Service_url } from '../../config/app.config';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/auth';
// import "../../styles/AuthStyles.css";


const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth ,setAuth] = useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(email,password)
    // console.log(process.env.API)
    // toast("Wow so easy!");
    try {
      const res = await axios.post(`${Service_url}/api/login`,{password,email});
      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
        })
        localStorage.setItem("auth",JSON.stringify(res.data))
        console.log(location.state?.from)
        navigate(location.state?.from || "/")
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
    <Layout title={"Login - Ecommerce App"}>
      <div className="register ">
        <form onSubmit={handleSubmit}>
          <h4 className='mt-2 mb-5'>Login Form</h4>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="button" className="btn text-end float-end mb-3" style={{width: "60%"}} onClick={()=>{
            navigate('/forgot-password')
          }}>forgot password</button>
          <button type="submit" className="btn btn-dark w-full" style={{width: "100%"}}>Login</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register
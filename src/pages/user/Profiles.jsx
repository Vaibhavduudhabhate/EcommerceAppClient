import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../Context/auth'
import { Service_url } from '../../config/app.config'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profiles = () => {
    const [auth, setAuth] = useAuth()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // get User Data
    useEffect(()=>{
        const {email,name,phone,address} = auth?.user
        setName(name)
        setEmail(email)
        setAddress(address)
        setPhone(phone)
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, phone, address)

        try {
            const {data} = await axios.put(`${Service_url}/api/profile`, { name, email, phone, address });
              if (data?.error) {
                  toast.error(data.message)
                }else{
                    setAuth({...auth,user:data?.updatedUser})
                    let ls = localStorage.getItem("auth")
                    ls = JSON.parse(ls)
                    ls.user = data.updatedUser
                    localStorage.setItem("auth",JSON.stringify(ls))
                    toast.success("Profile updated successfully")
                }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <Layout title={"Your Profile"}>
            <div className="container-fluid p-3 m-3 w-auto">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="register ">
                            <form onSubmit={handleSubmit}>
                                <h4 className='mt-2'>USER PROFILE</h4>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                                </div> */}
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" aria-describedby="phoneHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputAddress" className="form-label">address</label>
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" />
                                </div>
                                <button type="submit" className="btn btn-dark w-full" style={{ width: "100%" }}>UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profiles
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { Service_url } from '../../config/app.config';
import Spinner from '../Spinner';

const  AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => { 
        const autoCheck = async ()=>{
            const res = await axios.get(`${Service_url}/api/admin-auth`,{
            }
        );
        if(res.data.ok){
            setOk(true);
        }else{
            setOk(false);
        }
        }

        // try {
        //     const res = await axios.get(`${Service_url}/api/admin-auth`, {
        //         headers: {
        //             Authorization: `Bearer ${auth.token}` // Include the token in the headers
        //         }
        //     });
        //     if (res.data.ok) {
        //         setOk(true);
        //     } else {
        //         setOk(false);
        //     }
        // } catch (error) {
        //     console.error("Error checking admin auth:", error);
        //     setOk(false);
        // }
        if (auth?.token) autoCheck()
     }, [auth?.token]);
    return ok ? <Outlet /> : <Spinner path=""/>
}

export default AdminRoute;

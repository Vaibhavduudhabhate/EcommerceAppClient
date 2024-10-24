import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { Service_url } from '../../config/app.config';
import Spinner from '../Spinner';

const  PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => { 
        const autoCheck = async ()=>{
            const res = await axios.get(`${Service_url}/api/user-auth`,{
            }
        );
        if(res.data.ok){
            setOk(true);
        }else{
            setOk(false);
        }
        }
        if (auth?.token) autoCheck()
     }, [auth?.token]);
    return ok ? <Outlet /> : <Spinner/>
}

export default PrivateRoute;

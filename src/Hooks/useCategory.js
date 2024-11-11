import { useState , useEffect } from "react";
import axios from "axios";
import { Service_url } from "../config/app.config";

export default function useCategory(){
    const [ categories , setCategories ] = useState([]);

    const getCategories = async() =>{
        try {
            const data = await axios.get(`${Service_url}/api/category/all-category`)

            setCategories(data?.data.category)
            console.log(data?.data.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategories()
    },[])

    return categories;
}
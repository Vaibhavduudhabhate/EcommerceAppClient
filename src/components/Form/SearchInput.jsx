import React from 'react'
import { useSearch } from '../../Context/search'
import axios from 'axios'
import { Service_url } from '../../config/app.config'
import { useNavigate } from 'react-router-dom'
const SearchInput = () => {
    const [value,setValue] = useSearch()    
    const navigate = useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
           const data = await axios.get(`${Service_url}/api/product/search/${value.keyword}`) 
           setValue({...value,result:data})
           navigate("/search")
        } catch (error) {
           console.log(error) 
        }
    }

    const handleChange = (e) => {
        setValue({ ...value, keyword: e.target.value })  // Correctly update the keyword in the context
    }
  return (
    <div>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={value.keyword} onChange={handleChange} />
        <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    </div>
  )
}

export default SearchInput
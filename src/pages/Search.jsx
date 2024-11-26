import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../Context/search'
import { Service_url } from '../config/app.config'
import toast from 'react-hot-toast'
import { useCart } from '../Context/cart'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [values ,setValues] = useSearch()
    const [cart, setCart] = useCart()
    const navigate = useNavigate()


  return (
    <Layout title={'Search results'}>
        <div className="container">
            <div className="text-center">
                <h1>Search results</h1>
                <h6>
                    {values?.result.data.length < 1 ?"No Products found": `Found ${values?.result.data.length}`}
                </h6>
                {values?.result.data.length ? (
                                values && values?.result.data.map(pro => (
                                    // <Link key={pro._id} className='product_link' to={`/dashboard/admin/product/${pro.slug}`}>
                                    <div key={pro._id} className="card m-2" style={{ width: '18rem' }} >
                                        <img src={`${Service_url}/api/product/product-photo/${pro._id}`} className="card-img-top" alt={pro.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{pro.name}</h5>
                                            {pro.description && pro.description.length > 30
                                                ? pro.description.substring(0, 30) + '...'
                                                : pro.description}
                                            <p className="card-text">{pro.price} ₹</p>
                                            <button className='btn btn-primary' onClick={() => navigate(`/product/${pro.slug}`)}>More Details</button>
                                            <button className='btn btn-secondary ms-1' onClick={() => {
                                                    setCart([...cart, pro])
                                                    localStorage.setItem("cart",JSON.stringify([...cart,pro]))
                                                    toast.success("product added to cart")
                                                }}>ADD TO CART</button>
                                        </div>
                                    </div>
                                    // </Link>
                                ))
                            ) : (<>
                                <h1>
                                    Products Not Found.
                                </h1>
                            </>
                            )
                            }
            </div>
        </div>
    </Layout>
  )
}

export default Search
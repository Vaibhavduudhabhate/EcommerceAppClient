import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Service_url } from '../config/app.config';
import toast from 'react-hot-toast';
import { useCart } from '../Context/cart';

const CategoryProduct = () => {
        const params = useParams();
        const navigate = useNavigate();
        const [products,setProducts] = useState([]);
        const [category,setCategory] = useState([]);
        const [cart, setCart] = useCart()

        const getProductByCategory = async()=>{
            try {
                const data = await axios.get(`${Service_url}/api/product/product-category/${params.slug}`)
                console.log(data)
                setProducts(data?.data.products);
                setCategory(data?.data.category)
            } catch (error) {
                console.log(error)
            }
        }

        useEffect(()=>{
            getProductByCategory()
        },[params?.slug])

  return (
    <Layout title={"category wise product"}>
        <div className="container">
            <h1 className="category text-center">
               Category - {category?.name}
            </h1>
            <h3 className="category text-center">
                {products?.length} products found.
            </h3>
            <div className="d-flex flex-wrap">
                            {products.length ? (
                                products && products?.map(pro => (
                                    // <Link key={pro._id} className='product_link' to={`/dashboard/admin/product/${pro.slug}`}>
                                    <div key={pro._id} className="card m-2" style={{ width: '18rem' }} >
                                        <img src={`${Service_url}/api/product/product-photo/${pro._id}`} className="card-img-top" alt={pro.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{pro.name}</h5>
                                            {pro.description && pro.description.length > 30
                                                ? pro.description.substring(0, 30) + '...'
                                                : pro.description}
                                            <p className="card-text">{pro.price} ₹</p>
                                            <button className='btn btn-primary' onClick={()=>navigate(`/product/${pro.slug}`)}>More Details</button>
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

export default CategoryProduct
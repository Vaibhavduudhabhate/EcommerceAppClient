import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Service_url } from '../config/app.config'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../Context/cart'

const ProductDetails = () => {
    const params = useParams();
    const [product, setProducts] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart()

    const navigate = useNavigate()
    const getProduct = async () => {
        try {
            const data = await axios(`${Service_url}/api/product/get-product/${params.slug}`)
            setProducts(data?.data.product)
            getSimilarProducts(data?.data.product._id, data?.data.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    const getSimilarProducts = async (pid, cid) => {
        // console.log(pid, cid)
        try {
            const data = await axios(`${Service_url}/api/product/related-products/${pid}/${cid}`)
            // console.log(data)
            setRelatedProducts(data?.data.product)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (params?.slug) {
            getProduct()
        }
    }, [params?.slug])

    return (
        <Layout title={'Products Details page'}>
            <div className="row m-4">
                <div className="col-md-6">
                    <img src={`${Service_url}/api/product/product-photo/${product?._id}`} className="card-img-top" alt={product?.name} height={"400px"} width={"300px"} />
                </div>
                <div className="col-md-6 position-relative">
                    <h1 className='text-center'>Product details</h1>
                    <h4>Name : {product?.name}</h4>
                    <p>Description : {product?.description}</p>
                    <h3 className='mt-5'>Price : {product?.price}</h3>
                    <h4>Category : {product?.category?.name}</h4>
                    <h6>
                        {product && product.shipping === true ? 'Delivery : Available' : 'Delivery : Not Available'}
                    </h6>
                    <div className="btn btn-secondary position-absolute bottom-0" onClick={() => {
                                                    setCart([...cart, product])
                                                    localStorage.setItem("cart",JSON.stringify([...cart,product]))
                                                    toast.success("product added to cart")
                                                }}>Add TO Cart</div>
                </div>
            </div>
            <hr />
            <div className="row p-4 col-md-12">
                <h3>
                    Related Products
                </h3>
                <div className="d-flex flex-wrap">
                    {relatedProducts.length ? (
                        relatedProducts && relatedProducts?.map(pro => (
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

export default ProductDetails
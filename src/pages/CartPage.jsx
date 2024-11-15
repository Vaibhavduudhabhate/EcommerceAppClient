import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../Context/cart'
import { useAuth } from '../Context/auth'
import { useNavigate } from 'react-router-dom'
import { Service_url } from '../config/app.config'

const CartPage = () => {
    const [cart ,setCart] = useCart()
    const [auth ,setAuth] = useAuth();
    const navigate = useNavigate()

    const removeCartItem = (pid) =>{
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid) 
            myCart.splice(index,1)
            setCart(myCart)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(cart)
  return (
    <Layout>
        <div className="container">
            <div className="row">
                <h1 className='text-center bg-light p-2'>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
                <h4 className='text-center'>
                {
                            Array.isArray(cart) && cart.length > 0
                                ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}`
                                : "Your Cart is Empty"
                        }
                </h4>
            </div>
            <div className="row ">
                <div className="col-md-8">
                    {
                        cart?.map(pro =>(
                            <div className="row mb-2 card flex-row">
                                <div className="col-md-3" width="100px !important">
                                    <img src={`${Service_url}/api/product/product-photo/${pro._id}`} className="card-img-top checkout-detail-page" width={"100px"} alt={pro.name} />  
                                </div>
                                <div className="col-md-9">
                                    <h4>{pro.name}</h4>
                                    <p>{pro.description && pro.description.length > 30
                                                ? pro.description.substring(0, 30) + '...'
                                                : pro.description}</p>
                                      <p className="card-text mb-1">{pro.price} ₹</p>
                                      <button className='btn btn-danger' onClick={()=>removeCartItem(pro._id)}>Remove</button>          
                                </div>
                            </div>
                        ))
                    }

                    {/* Cart Item        */}
                </div>
                <div className="col-md-3">
                    Checkout | payment
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage
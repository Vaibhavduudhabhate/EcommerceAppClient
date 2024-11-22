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

    const totalPrice = () =>{
        try {
            let total = 0;
            cart?.map((item)=>{
                total = total + item.price
            })
            return total.toLocaleString("en-US",{
                currency:"INR",
                style:"currency"
            })
        } catch (error) {
            console.log(error)
        }
    }

    const removeCartItem = (pid) =>{
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid) 
            myCart.splice(index,1)
            setCart(myCart)
            localStorage.setItem('cart',JSON.stringify(myCart))
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
                            <div className="row mb-2 p-3 card flex-row">
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

                    {/* Cart Item */}
                </div>
                <div className="col-md-3 text-center">
                    <h2>Cart Summary</h2>
                    <p>
                    Total | Checkout | payment
                    </p>
                    <hr />
                    <h4>Total : {totalPrice()}</h4>
                    {auth?.user?.address ? (
                        <>
                        <div className="mb-3">
                            <h4>Current Address : </h4>
                            <h5>{auth?.user?.address}</h5>
                            <button className='btn btn-outline-warning' onClick={()=>
                                navigate("/dashboard/user/profile")
                            }>Update Address</button>
                        </div>
                        </>
                    ) : (
                        <div className="mb-3">
                            {
                                auth?.token ? (
                                    <button className="btn btn-outline-warning" onClick={()=>
                                navigate("/dashboard/user/profile")
                            }>
                                        Update Address
                                    </button>
                                ) : (
                                    <button className="btn btn-outline-warning" onClick={()=>
                                navigate("/login" ,{state:"/cart"})
                            }>
                                       Please Login To Checkout
                                    </button>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage
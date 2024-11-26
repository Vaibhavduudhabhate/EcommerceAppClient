import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Service_url } from '../config/app.config';
import { Checkbox, Radio } from 'antd';
import toast from 'react-hot-toast';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/cart';
const HomePage = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState("")
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [cart, setCart] = useCart()
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    // const getTotal = async ()=>{
    //     try {
    //         const data = await axios.get(`${Service_url}/api/product/product-count`)
    //         console.log(data)
    //         setTotal(data?.data.total)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(()=>{
    //     if(page === 1) return
    //     loadMore()
    // },[page ])
    // const loadMore = async()=>{
    //     try {
    //         setLoading(true)
    //         const data = await axios.get(`${Service_url}/api/product/product-list/${page}`)
    //         console.log(data)
    //         setLoading(false)
    //         // setTotal(data?.data.total)
    //         if (Array.isArray(data?.data.products)) {
    //             setProducts(prevProducts => [...prevProducts, ...data?.data.products]);
    //         } else {
    //             console.log("No products found or invalid data:", data?.products);
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false);
    //     }
    // }

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${Service_url}/api/category/all-category`)
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category")
        }
    }

    useEffect(() => {
        getAllCategory()
        // getTotal()
    }, [])

    const getAllProducts = async () => {
        try {
            setLoading(true)
            const data = await axios.get(`${Service_url}/api/product/get-product`)
            setLoading(false)

            setProducts(data.data.products)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const handleFilter = async (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((cat) => cat !== id); // Fix the filtering logic
        }
        setChecked(all); // Update the checked state
    }

    useEffect(() => {
        if (!checked.length && !radio) {
            getAllProducts();
        }
    }, [checked.length, radio]);

    useEffect(() => {
        if (checked.length || radio) {
            filterProduct();
        }
    }, [checked, radio]);

    // filter Product
    const filterProduct = async () => {
        try {
            const data = await axios.post(`${Service_url}/api/product/product-filter`, { checked, radio })
            console.log(data)
            setProducts(data?.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    const hendleResetFilter = async () => {
        setChecked([]);
        setRadio("");
    }
    return (
        <>
            <Layout title={"Home page Ecommerce"}>
                <div className="row m-4">
                    {/* <div className="col-md-3">
                        <h5 className='text-center'>
                            Filter By Category
                        </h5>
                        <div className="d-flex flex-column">
                            {categories && categories.map((cat) => (
                                <Checkbox key={cat._id}
                                    checked={checked.includes(cat._id)} onChange={(e) => handleFilter(e.target.checked, cat._id)}>
                                    {cat.name}
                                </Checkbox>
                            ))}
                        </div>
                        <h5 className='text-center mt-4'>
                            Filter By price
                        </h5>
                        <div className="d-flex flex-column">
                            <Radio.Group onChange={e => setRadio(e.target.value)} value={radio}>
                                {Prices?.map(p => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>
                                            {p.name}
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className="mt-4 d-flex flex-column">
                            <button className="btn btn-danger" onClick={() =>
                                hendleResetFilter()
                                // window.location.reload()
                            }>
                                Reset Filters
                            </button>
                        </div>
                    </div> */}
                    {/* 26 nov */}
                    <div className="d-flex w-auto gap-3 align-items-center p-2 bg-dark text-white rounded">
                        {/* Filter by Category */}
                        <div className="dropdown">
                            <button
                                className="btn btn-dark dropdown-toggle"
                                type="button"
                                id="filterCategory"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {checked.length > 0
                                    ? `Selected (${checked.length})`
                                    : "Filter by Category"}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="filterCategory">
                                {categories &&
                                    categories.map((cat) => (
                                        <li key={cat._id} className="dropdown-item">
                                            <Checkbox
                                                checked={checked.includes(cat._id)}
                                                onChange={(e) => handleFilter(e.target.checked, cat._id)}
                                            >
                                                {cat.name}
                                            </Checkbox>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        {/* Filter by Price */}
                        <div className="dropdown">
                            <button
                                className="btn btn-dark dropdown-toggle"
                                type="button"
                                id="filterPrice"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {radio ? `Selected Price: ${Prices.find((p) => p.array === radio)?.name || "Custom"}` : "Filter by Price"}
   
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="filterPrice">
                                {Prices?.map((p) => (
                                    <li key={p._id} className="dropdown-item">
                                        <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
                                            <Radio value={p.array}>{p.name}</Radio>
                                        </Radio.Group>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Reset Filters */}
                        <button className="btn btn-danger" onClick={hendleResetFilter}>
                            Reset Filters
                        </button>
                    </div>

                    {/* 26 Nov */}

                    {/* <div className="col-md-9">
                        <h3 className="text-center">
                            All Procucts
                        </h3>
                        <div className="d-flex flex-wrap">
                            {products.length ? (
                                products && products?.map(pro => (
                                    
                                    <div key={pro._id} className="card m-2" style={{ width: '18rem' }} >
                                        <img src={`${Service_url}/api/product/product-photo/${pro._id}`} className="card-img-top" alt={pro.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{pro.name}</h5>
                                            {pro.description && pro.description.length > 30
                                                ? pro.description.substring(0, 30) + '...'
                                                : pro.description}
                                            <p className="card-text">{pro.price} ₹</p>
                                            <button className='btn btn-primary' onClick={() => navigate(`/product/${pro.slug}`)}>More Details</button>
                                            <button className='btn btn-secondary ms-1'
                                                onClick={() => {
                                                    setCart([...cart, pro])
                                                    localStorage.setItem("cart", JSON.stringify([...cart, pro]))
                                                    toast.success("product added to cart")
                                                }}
                                            >ADD TO CART</button>
                                        </div>
                                    </div>
                                ))
                            ) : (<>
                                <h1>
                                    Products Not Found.
                                </h1>
                            </>
                            )
                            }
                        </div>
                        <div className='total m-4 p-3 text-center'>
                            {products.length ? (products && products.length < total && (
                                <button className='btn btn-warning' onClick={(e) => {
                                    e.preventDefault()
                                    setPage(page + 1)
                                }}>
                                    {loading ? "loading ..." : "Loadmore"}
                                </button>
                            )
                            ) : (<>

                            </>
                            )
                            }
                        </div>
                    </div> */}

                    {/* 26 Nov */}
                    <div className="col-md-12">
                        <h3 className="text-center">All Products</h3>
                        <div className="row">
                            {products.length ? (
                                products.map((pro) => (
                                    <div key={pro._id} className="col-md-4 mb-4 d-flex align-items-stretch">
                                        <div className="card shadow-sm">
                                            <img
                                                src={`${Service_url}/api/product/product-photo/${pro._id}`}
                                                className="card-img-top"
                                                alt={pro.name}
                                            />
                                            <div className="card-body d-flex flex-column" style={{backgroundColor:"#e4f1f1"}}
                                            // {
                                            //     "background-color: #e4f1f1;"}
                                                >
                                                <h5 className="card-title">{pro.name}</h5>
                                                <p className="card-text">
                                                    {pro.description && pro.description.length > 30
                                                        ? pro.description.substring(0, 30) + "..."
                                                        : pro.description}
                                                </p>
                                                <p className="card-text fw-bold">{pro.price} ₹</p>
                                                <div className="mt-auto">
                                                    <button
                                                        className="btn btn-info w-100 mb-2"
                                                        onClick={() => navigate(`/product/${pro.slug}`)}
                                                    >
                                                        More Details
                                                    </button>
                                                    <button
                                                        className="btn btn-dark  w-100"
                                                        onClick={() => {
                                                            setCart([...cart, pro]);
                                                            localStorage.setItem("cart", JSON.stringify([...cart, pro]));
                                                            toast.success("Product added to cart");
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <h4>Products Not Found.</h4>
                                </div>
                            )}
                        </div>

                        {/* Load More Button */}
                        {products.length && products.length < total && (
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-warning"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }}
                                >
                                    {loading ? "Loading ..." : "Load More"}
                                </button>
                            </div>
                        )}
                    </div>
                    {/* 26 Nov */}

                </div>
            </Layout>
        </>
    )
}

export default HomePage
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Service_url } from '../config/app.config';
import { Checkbox, Radio } from 'antd';
import toast from 'react-hot-toast';
import { Prices } from '../components/Prices';
const HomePage = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState("")
    const [total ,setTotal] = useState(0)
    const [page,setPage] = useState(1)
    const [loading , setLoading] = useState();

    const getTotal = async ()=>{
        try {
            const data = await axios.get(`${Service_url}/api/product/product-count`)
            console.log(data)
            setTotal(data?.data.total)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(page === 1) return
        loadMore()
    },[page ])
    const loadMore = async()=>{
        try {
            setLoading(true)
            const data = await axios.get(`${Service_url}/api/product/product-list/${page}`)
            console.log(data)
            setLoading(false)
            // setTotal(data?.data.total)
            if (Array.isArray(data?.data.products)) {
                setProducts(prevProducts => [...prevProducts, ...data?.data.products]);
            } else {
                console.log("No products found or invalid data:", data?.products);
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

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
        getTotal()
    }, [])

    const getAllProducts = async () => {
        try {
            setLoading(true)
            const data = await axios.get(`${Service_url}/api/product/product-list/${page}`)
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
                    <div className="col-md-3">
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
                    </div>
                    <div className="col-md-9">
                        {/* {JSON.stringify(radio, null, 4)} */}
                        <h3 className="text-center">
                            All Procucts
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
                                            <p className="card-text">{pro.price}</p>
                                            <button className='btn btn-primary'>More Details</button>
                                            <button className='btn btn-secondary ms-1'>ADD TO CART</button>
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
                        <div className='total m-4 p-3 text-center'>
                            {/* {total} */}
                            {products.length ? (products && products.length < total && (
                                <button className='btn btn-warning' onClick={(e)=>{
                                    e.preventDefault()
                                    setPage(page + 1)
                                }}>
                                    {loading ? "loading ...": "Loadmore"}
                                </button>
                            )
                        ):(<>
                            
                        </>
                        )
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default HomePage
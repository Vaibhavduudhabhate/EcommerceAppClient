import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../Context/auth'

const HomePage = () => {
    const [auth ,setAuth] =useAuth();
    return (
        <>
            <Layout title={"Home page Ecommerce"}>
                <h1>
                    HomePage
                </h1>
                <pre>
                    {JSON.stringify(auth ,null,4)}
                </pre>
            </Layout>
        </>
    )
}

export default HomePage
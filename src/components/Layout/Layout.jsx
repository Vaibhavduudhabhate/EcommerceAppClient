import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Helmet } from "react-helmet"
const Layout = ({ children ,title,description,keywords,author}) => {
  return (
    <div>
      <Header />
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />
        <title>{title}</title>
      </Helmet>
      <main style={{ height: "100%",overflow:"auto" }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title:"Ecommerce app",
  description:"Practice Mern Stack Project",
  keywords:"react,node, mongo,css,bootstrap",
  author:"vaibhav"
}

export default Layout
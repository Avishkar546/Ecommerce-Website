import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useAuth } from '../Context/AuthContext'

const HomePage = ({ title, description }) => {

  const [auth, setAuth] = useAuth();

  return (

    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ecommerce App - Home</title>
        <meta name="description" content={description} />
        <meta name="keyword" content='Shopping, Ecommerce, Product, Purchase, Shopify, Buying, Mobiles, Shirt, Electronics, Clothes, Pants, T-Shirt'></meta>
      </ Helmet>
      <h1>This is Homepage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  )
}

export default HomePage

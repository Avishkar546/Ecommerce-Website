import React from 'react'
import { Helmet } from 'react-helmet'
const HomePage = ({title, description}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ecommerce App - Home</title>
        <meta name="description" content={description} />
        <meta name="keyword" content='Shopping, Ecommerce, Product, Purchase, Shopify, Buying, Mobiles, Shirt, Electronics, Clothes, Pants, T-Shirt'></meta>
      </ Helmet>
      <h1>This is Homepage</h1>
    </div>
  )
}

export default HomePage

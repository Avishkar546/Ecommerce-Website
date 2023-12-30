import React from 'react'
import { Helmet } from 'react-helmet'
const About = ({ title, description }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ecommerce App - Who we are</title>
        <meta name="description" content=" Know About Us - Who We are" />
        <meta name="keyword" content='Shopping, Ecommerce, Product, Purchase, Shopify, Buying, Mobiles, Shirt, Electronics, Clothes, Pants, T-Shirt'></meta>
      </ Helmet>
      <p>This is about</p>
    </div>
  )
}

export default About

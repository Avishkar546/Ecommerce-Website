import React from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Go Home - Not Found</title>
        <meta name="keyword" content='Shopping, Ecommerce, Product, Purchase, Shopify, Buying, Mobiles, Shirt, Electronics, Clothes, Pants, T-Shirt'></meta>
      </ Helmet>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className='pnf-btn'>Go Back</Link>
      </div>
    </>
  );
};

export default PageNotFound

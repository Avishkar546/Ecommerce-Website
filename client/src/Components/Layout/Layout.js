import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description }) => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default Layout

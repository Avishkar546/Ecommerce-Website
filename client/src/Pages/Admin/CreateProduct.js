import React from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'

const CreateProduct = () => {
  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          Create product
        </div>
      </div>
    </div>
  )
}

export default CreateProduct

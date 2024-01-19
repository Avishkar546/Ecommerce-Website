import React from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'

const TotalRevenue = () => {
    return (
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    Total Revenue
                </div>
            </div>
        </div>
    )
}

export default TotalRevenue

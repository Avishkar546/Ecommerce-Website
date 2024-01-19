import React from 'react'
import UserMenu from '../../Components/Layout/UserMenu'

const Orders = () => {
    return (
        <div>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        Orders
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Orders

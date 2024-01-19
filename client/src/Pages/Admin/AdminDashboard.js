import React from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useAuth } from '../../Context/AuthContext'

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <div>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card m-5">
              <div className="card-header text-center">
                {auth?.user?.name}
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>Email : {auth.user.email}</p>
                  <p>Mobile No. : {auth.user.phone}</p>
                  <p>Address : {auth.user.address}</p>
                  <p>Role : Admin</p>
                  <footer className="blockquote-footer">Thank You </footer>
                </blockquote>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
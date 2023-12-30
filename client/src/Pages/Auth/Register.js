import React from 'react'


const Register = () => {
    return (
        <div className="register">
            <form>
                <div className="form-group m-4">
                    <input type="text" className="form-control" id="Name" name='name' placeholder="Enter Your Name" />
                </div>
                <div className="form-group m-4">
                    <input type="email" className="form-control" id="email" name='email' placeholder="Enter email" />
                </div>
                <div className="form-group m-4">
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" />
                </div>
                <div className="form-group m-4">
                    <input type="text" className="form-control" id="phone" name='phone' placeholder="Mobile No." />
                </div>
                <div className="form-group m-4">
                    <textarea type="Address" className="form-control" id="Address" name='address' placeholder="Address" />
                </div>
                <button type="submit" className="btn btn-primary text-center mt-3">Submit</button>
            </form>
        </div>
    )
}

export default Register

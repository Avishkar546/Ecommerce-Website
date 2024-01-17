import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
    const [count, setCount] = useState({
        count: 5
    });
    const Navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount({
                count: count.count - 1
            })

            count.count === 0 && Navigate("/login");
            return clearInterval(interval);
        },1000)
    }, [count, Navigate])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
            <h1 className='Text-center'>Redirecting you within {count.count} seconds</h1>
            <div className="spinner-border" role="status"></div>
        </div>
    )
}

export default Spinner

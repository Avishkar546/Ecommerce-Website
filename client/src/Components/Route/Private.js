import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export const PrivateRoute = () => {
    const [auth] = useAuth();
    const [ok, setOk] = useState(false); // To check if user is login or not and render corresponding component

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("http://localhost:8080/api/v1/auth/auth-dashboard", {
                headers: {
                    "Authorization": auth?.token
                }
            })
            // console.log(res.data);
            if (res.data.success) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner />;

}

export default PrivateRoute
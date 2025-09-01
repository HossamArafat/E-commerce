import { Navigate, Outlet, useNavigate } from "react-router-dom"
import Cookie from 'cookie-universal'
import { useEffect, useState } from "react"
import { USER } from "../../API/Api"
import LoadingSubmit from "../../Components/Loading/Loading"
import { customAxios } from "../../API/CustomAxios"
import Err403 from "./403"

export default function RequireAuth({allowedRole}) {
    const cookie = new Cookie()
    const token = cookie.get('accessToken')
    const navigate = useNavigate()
    const [user, setUser] = useState('')    
    useEffect(()=>{
        customAxios.get(`${USER}`)
        .then((data) => setUser(data.data))
        .catch((err) => {
            console.log(err)
            navigate('/login')
        })
    }, [])
    return token ? user === '' ? <LoadingSubmit/> : allowedRole.includes(user.role) ?   <Outlet /> : <Err403 role={user.role}/> : <Navigate to="/login" />;

}
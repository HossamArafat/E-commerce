import { Outlet } from "react-router-dom"
import Cookie from 'cookie-universal'


export default function RequireBack() { 
    const cookie = new Cookie()
    const token = cookie.get('accessToken')
    
    return token ? window.history.back() : <Outlet/>;
}
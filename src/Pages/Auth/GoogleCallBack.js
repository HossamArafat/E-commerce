import axios from "axios";
import { baseURL, GOOGLE_CALL_BACK} from "../../API/Api";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal'
import LoadingSubmit from "../../Components/Loading/Loading";

function GoogleCallBack() {
    const cookie = Cookie()
    const location = useLocation()
    const nav = useNavigate()
    useEffect(()=>{
        async function GoogleCall() {
            try{
                const res = await axios.get(`${baseURL}/${GOOGLE_CALL_BACK}${location.search}`)
                console.log(res)
                const token = res.data.access_token;
                cookie.set("accessToken", token)
                nav("/dashboard/categories")
            } catch(err) {
                console.log(err);
            }
        }
        GoogleCall()
    }, [cookie, location.search, nav])
    
    return (
        <LoadingSubmit/>
    )
}

export default GoogleCallBack;
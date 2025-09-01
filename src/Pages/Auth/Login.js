import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../API/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import Cookie from 'cookie-universal'
import { useNavigate } from "react-router-dom";

function Login() {
    // States
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const cookie = Cookie()
    const nav = useNavigate();

    const focus = useRef("")
    useEffect(() => {
        focus.current.focus()
    }, [])

    // Handle Form Change
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    // Handle Submit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try{
            const res = await axios.post(`${baseURL}/${LOGIN}`, form)
            setLoading(false);

            const token = res.data.token;
            cookie.set("accessToken", token)

            const go = res.data.user.role === '1995' ? 'users' : 'categories'
            nav(`/dashboard/${go}`)
        } catch(err) {
            console.log(err);
            setLoading(false);
            if(err.response.status === 401)
                setErr("Wrong Email Or Password");
            else
                setErr("Internal Server Error")
        }
    }
  return (
    <>
        { loading && <LoadingSubmit></LoadingSubmit> }
        <div className="my-container">
            <div className="my-row my-h-100">
                <form className="my-form" onSubmit={handleSubmit}>
                    <div className="my-custom-form ">
                        <h1>Login Now</h1>
                        <div className="mb-4 fw-lighter">
                            Login As Admin For Testing All Features :<br/>
                            <small className="">email: admin@gmail.com</small> ,
                            <small>password: admin123$%</small>
                        </div>
                        <div className="my-form-control">
                            <input ref={focus} type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter Your email .. " required/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="my-form-control">
                            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter Your Password .. " required minLength={6}/>
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="my-buttons">
                            <button type="submit" className="my-btn my-btn-primary">Login</button><br/>
                            <button type="button" className="login-with-google-btn" >
                                <a href={`http://127.0.0.1:8000/login-google`} >Sign in with Google</a>
                            </button>
                            <p>Don’t you have an account? <span onClick={()=> nav("/register")} style={{fontWeight: '600', color: '#0d6efd', cursor: 'pointer'}}>Sign up</span></p>
                        </div>
                        {err !== "" && <span className="my-error">{err}</span>}
                    </div>
                </form>
            </div>
        </div>
    </>
  );
}

export default Login;


import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, REGISTER } from "../../API/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

function Register() {
  // States
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const cookie = Cookie();
  const nav = useNavigate();

  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle Form Change
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);

      const token = res.data.token;
      cookie.set("accessToken", token);
      nav("/dashboard/categories");
    } catch (err) {
      setLoading(false);
      if (err.response.status === 422) setErr("Email is already been taken");
      else setErr("Internal Server Error");
    }
  }
  return (
    <>
      {loading && <LoadingSubmit></LoadingSubmit>}
      <div className="my-container">
        <div className="my-row my-h-100">
          <form className="my-form" onSubmit={handleSubmit}>
            <div className="my-custom-form ">
              <h1>Register Now</h1>
              <div className="my-form-control">
                <input
                ref={focus}
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name .. "
                  required
                  minLength={3}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="my-form-control">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your email .. "
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="my-form-control">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password .. "
                  required
                  minLength={6}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="my-buttons">
                <button type="submit" className="my-btn my-btn-primary">
                  Register
                </button>
                <br />

                <button type="button" className="login-with-google-btn">
                  <a href={`http://127.0.0.1:8000/login-google`}>
                    Register with Google
                  </a>
                </button>
                <p>Already have an account? <span onClick={()=> nav("/login")} style={{fontWeight: '600', color: '#0d6efd', cursor: 'pointer'}}>Log in</span></p>
              </div>
              {err !== "" && <span className="my-error">{err}</span>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;

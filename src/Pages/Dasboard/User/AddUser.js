import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { customAxios } from "../../../API/CustomAxios";
import { USER } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  // Constants
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);

  async function HandleAdd(e) {
    e.preventDefault();
    setLoading(true);
    try {
      customAxios.post(`${USER}/add`, {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      navigate("/dashboard/users")
    } catch (err) {
      setLoading(false);
    }
  }

  // Handle functions
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (
      form.name.length > 1 &&
      form.email.length > 1 &&
      form.password.length > 1 &&
      form.role.length > 1
    )
      setDisable(false);
    else setDisable(true);
  }
  
  return (
    <div className="custom-box-shadow w-100">
      {loading && <LoadingSubmit />}
      <Form className="bg-bg-white w-100 mx-2 p-3" onSubmit={HandleAdd}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            ref={focus}
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="name ... "
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput2"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email.."
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput3"
        >
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={form.role} onChange={handleChange}>
            <option disabled value={""}>
              Select Role
            </option>
            <option value={"1995"}>Admin</option>
            <option value={"2001"}>User</option>
            <option value={"1996"}>Writer</option>
            <option value={"1999"}>Product Manager</option>
          </Form.Select>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput4"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password.."
          />
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </div>
  );
}

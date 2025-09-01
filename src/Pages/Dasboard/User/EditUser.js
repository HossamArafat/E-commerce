import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { customAxios } from "../../../API/CustomAxios"
import { USER } from "../../../API/Api"
import { useNavigate, useParams } from "react-router-dom"
import LoadingSubmit from "../../../Components/Loading/Loading"

export default function User() {
    // States
    const [form, setForm] = useState({
        name: '',
        email: '',
        role: '',
    })
    const [disable, setDisable] = useState(true)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        customAxios.get(`${USER}/${id}`)
        .then((res) => setForm({name: res.data.name, email: res.data.email, role: res.data.role}))
        .then(() => {
            setDisable(false);
            setLoading(false);
        }).catch(()=> navigate("/dashboard/users/page/404"))
    }, [])

    // Handle functions
    async function HandleEdit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            await customAxios.post(`${USER}/edit/${id}`, {
             name: form.name,
             email: form.email,
             role: form.role,
            })
            navigate('/dashboard/users')
        } catch(err) { setLoading(false) }
    }
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    return (
        <div className="custom-box-shadow w-100">
            {loading && <LoadingSubmit/>}
            <Form className="bg-bg-white w-100 mx-2 p-3" onSubmit={HandleEdit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" value={form.name} onChange={handleChange} type="text" placeholder="name ... " />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlControlInput2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="email.." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlControlInput3">
                    <Form.Label>Email</Form.Label>
                    <Form.Select name="role" value={form.role} onChange={handleChange}>
                        <option disabled value={""}>Select Role</option>
                        <option value={'1995'}>Admin</option>
                        <option value={'2001'}>User</option>
                        <option value={'1996'}>Writer</option>
                        <option value={'1999'}>Product Manager</option>
                    </Form.Select>
                </Form.Group>
                <button disabled={disable} className="btn btn-primary">Save</button>
            </Form>
        </div>
    )
}
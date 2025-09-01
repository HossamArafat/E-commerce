import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { customAxios } from "../../../API/CustomAxios";
import { Cat } from "../../../API/Api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSubmit from "../../../Components/Loading/Loading";

export default function Category() {
  // States
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams()

  const form = new FormData();
  form.append("title", title);
  form.append("image", image);

  useEffect(() => {
    customAxios
      .get(`${Cat}/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setImage(res.data.image);
      })
      .then(() => {
        setDisable(false);
        setLoading(false);
      })
      .catch(() => navigate("/dashboard/categories/page/404"));
  }, []);

  // Handle functions
  async function HandleEdit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await customAxios.post(`${Cat}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories"
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <div className="custom-box-shadow w-100">
      {loading && <LoadingSubmit />}
      <Form className="bg-bg-white w-100 mx-2 p-3" onSubmit={HandleEdit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="title ... "
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput2"
        >
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="Image"
            // value={image}
            onChange={(e) => setImage(e.target.files.item(0))}
            placeholder="choose image.."
          />
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </div>
  );
}

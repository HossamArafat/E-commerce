import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { customAxios } from "../../../API/CustomAxios";
import { Cat } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddCat() {
  // States
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle functions
  async function HandleAdd(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("title", title);
    form.append("image", image);

    try {
      await customAxios.post(`${Cat}/add`, form);
      navigate('/dashboard/categories')
    } catch (err) {
      setLoading(false);
    }
  }

  function handleChange(e) {
    if (title.length > 2) setDisable(false);
    else setDisable(true);
    console.log("change");
  }

  return (
    <div className="custom-box-shadow w-100">
      {loading && <LoadingSubmit />}
      <Form
        className="bg-bg-white w-100 mx-2 p-3"
        onChange={handleChange}
        onSubmit={HandleAdd}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            ref={focus}
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

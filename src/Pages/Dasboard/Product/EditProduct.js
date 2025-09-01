import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { customAxios } from "../../../API/CustomAxios";
import { CAT, IMG, Prod } from "../../../API/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import "../../../CSS/components/progress.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function Product() {
  // States
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    About: "",
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [idsFromServer, setIdsFromServer] = useState([]);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();

  const focus = useRef("");
  const openLoading = useRef("");
  const progressStyle = useRef([]);
  const progressValue = useRef([]);
  const IDs = useRef([]);
  const count = useRef(-1);
  useEffect(() => {
    focus.current.focus();
    console.log("done..")
  }, []);

  function handleOpenLoading() {
    openLoading.current.click();
  }

  useEffect(() => {
    customAxios.get(`/${Prod}/${id}`)
      .then((res) => {
        setForm(res.data[0])
        setImagesFromServer(res.data[0].images)
      })
      .catch((err) => console.log(err));
  }, []);

    useEffect(() => {
    customAxios
      .get(`/${CAT}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Handling Functions
  async function handleEditForm(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await customAxios.post(`${Prod}/edit/${id}`, form);
      navigate("/dashboard/products");
    } catch (err) {
      setLoading(false);
    }
    idsFromServer.forEach((id) => {
      customAxios.delete(`${IMG}/${id}`)
      .catch((err) => console.log(err))
    })
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleDelete(id, img) {
    const findID = IDs.current[id]
    try {
      await customAxios.delete(`${IMG}/${findID}`);

      setImages((prev) => prev.filter((IMG) => IMG !== img));
      IDs.current = IDs.current.filter((ID) => ID !== findID);
      count.current--

    }catch(err){
      console.log(err) 
    }
  }

  async function handleDeleteFromServer(id) {
    setImagesFromServer((prev) => prev.filter((img) => img.id !== id));
    setIdsFromServer((prev) => {return [...prev, id]})
  }

  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);

    const imagesFiles = e.target.files;
    const data = new FormData();

    for (let i = 0; i < imagesFiles.length; i++) {
      count.current++;
      data.append("image", imagesFiles[i]);
      data.append("product_id", id);
      try {
        const res = await customAxios.post(`${IMG}/add`, data, {
          onUploadProgress: (e) => {
            // Calc 
            const uploading = (e.loaded * 100) / e.total;
            // Round
            const percent = Math.floor(uploading);
            // Condition
            if (percent % 10 === 0) {
              progressStyle.current[count.current].setAttribute("data-percentage", `${percent}`);
              progressValue.current[count.current].textContent = `${percent}%`;
            }
          },
        });
        IDs.current[count.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Mapping
  const categoriesShow = categories.map((cat, index) => (
    <option key={index} value={cat.id}>
      {cat.title}
    </option>
  ));

  const imagesShow = images.map((img, index) => (
    <div key={index} className="col-sm-2 mt-3 p-1 position-relative" style={{ width: "150px" }} >
      <div className="card" style={{height: '100%'}}>
        <img
          src={URL.createObjectURL(img)}
          alt="img"
          width="100%"
          height="90px"
        />
        <div
          className="card-body gap-3 p-2 d-flex align-items-center"
          style={{ fontSize: "14px" }}
        >
          <div>
            <p className="card-text my-1" style={{width: '9ch'}}>{img.name}</p>
            <p className="card-text">
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
          <div style={{ width: "87px"}}>
            <span onClick={() => handleDelete(index, img)} style={{position: 'absolute', right: '3px', top: '-2px', color: 'gray', cursor: 'pointer'}}><FontAwesomeIcon icon={faXmark} /></span>
            <div className="progress" ref={(e) => (progressStyle.current[index] = e)} 
            >
              <span className="progress-left">
                <span className="progress-bar"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar"></span>
              </span>
              <div className="progress-value">
                <div ref={(e) => (progressValue.current[index] = e)}> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

    const imagesFromServerShow = imagesFromServer.map((img, index) => (
    <div key={index} className="col-sm-2 mt-3 p-1 position-relative" style={{ width: "150px" }} >
      <div className="card" style={{height: '100%'}}>
        <img
          src={img.image}
          alt="img"
          width="100%"
          height="90px"
        />
        <div
          className="card-body gap-3 p-2 d-flex align-items-center"
          style={{ fontSize: "14px" }}
        >
          <div style={{ width: "87px"}}>
            <span onClick={() => handleDeleteFromServer(img.id)} style={{position: 'absolute', right: '3px', top: '-2px', color: 'white', cursor: 'pointer'}}><FontAwesomeIcon icon={faXmark} /></span>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="custom-box-shadow w-100">
      {loading && <LoadingSubmit />}
      <Form
        className="bg-bg-white w-100 mx-2 p-3"
        onSubmit={handleEditForm}
      >
        <Form.Group className="mb-3" controlId="catID">
          <Form.Label>Category</Form.Label>
          <Form.Select
            ref={focus}
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option disabled value={""}>
              Select Category
            </option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="titleID">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            placeholder="title ... "
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="descID">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={form.description}
            onChange={handleChange}
            type="text"
            placeholder="decription ... "
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="priceID">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            value={form.price}
            onChange={handleChange}
            type="text"
            placeholder="price ... "
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="priceID">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            name="discount"
            value={form.discount}
            onChange={handleChange}
            type="text"
            placeholder="discount ... "
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="AboutID">
          <Form.Label>About</Form.Label>
          <Form.Control
            name="About"
            value={form.About}
            onChange={handleChange}
            type="text"
            placeholder="about ... "
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            name="stock"
            value={form.stock}
            onChange={handleChange}
            type="number"
            placeholder="stock ... "
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput2"
        >
          <Form.Label>Image</Form.Label>
          <Form.Control
            ref={openLoading}
            hidden
            multiple
            type="file"
            name="images"
            onChange={handleImagesChange}
          />
        </Form.Group>
        <div
          onClick={handleOpenLoading}
          className="d-flex align-items-center justify-content-center rounded gap-2 py-3 flex-column"
          style={{
            border: "2px dashed gray",
            cursor: "pointer",
          }}
        >
          <img
            src={"/upload.png"}
            alt="upload here"
            width={"100px"}
          />
          <p
            style={{ color: "#0086fe", marginBottom: 0 }}
          >
            Upload images
          </p>
        </div>
        <div className="row">
          {imagesFromServerShow}
        </div>
        <div className="row">
          {imagesShow}
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <button className="btn btn-primary py-2 px-4">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

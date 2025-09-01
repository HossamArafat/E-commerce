import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Pages/Dasboard/User/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dasboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import User from "./Pages/Dasboard/User/EditUser";
import AddUser from "./Pages/Dasboard/User/AddUser";
import Err404 from "./Pages/Auth/404";
import RequireBack from "./Pages/Auth/RequireBack";
import Categories from "./Pages/Dasboard/Cat/Categories";
import AddCat from "./Pages/Dasboard/Cat/AddCat";
import Category from "./Pages/Dasboard/Cat/EditCat";
import Products from "./Pages/Dasboard/Product/Products";
import AddProduct from "./Pages/Dasboard/Product/AddProduct";
import Product from "./Pages/Dasboard/Product/EditProduct";
import Site from "./Pages/Website/Site";
import Home from "./Pages/Website/Home/Home";
import AllCategories from "./Pages/Website/AllCategories";
import SingleProduct from "./Pages/Website/Home/Sections/Products/SingleProduct";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Site />}>
          <Route path="/" element={<Home/>}/>
          <Route path="/allcategories" element={<AllCategories/>}/>
          <Route path="/product/:id" element={<SingleProduct/>}/>
        </Route>
        <Route element={<RequireBack />}>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Route>
        <Route path="auth/google/callback" element={<GoogleCallBack />}></Route>
        <Route path="/*" element={<Err404 />}></Route>
        
        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRole={["1995", "1999", "2001"]} />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={"1995"} />}>
              <Route path="users" element={<Users />}></Route>
              <Route path="users/:id" element={<User />}></Route>
              <Route path="user/add" element={<AddUser />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1999", "2001"]} />}>
              <Route path="categories" element={<Categories />}></Route>
              <Route path="categories/:id" element={<Category />}></Route>
              <Route path="category/add" element={<AddCat />}></Route>
            </Route>
             <Route element={<RequireAuth allowedRole={["1995", "1999", "2001"]} />}>
              <Route path="products" element={<Products />}></Route>
              <Route path="products/:id" element={<Product />}></Route>
              <Route path="product/add" element={<AddProduct />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

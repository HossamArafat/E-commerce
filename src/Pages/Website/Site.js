import Footer from "./Footer";
import Header from "./Header";
import '../../CSS/pages/website/style.css'
import { Outlet } from "react-router-dom";

function Site() {
  return (
    <div className="App">
      <Header />
      <Outlet/>
      <Footer />
    </div>
  );
}

export default Site
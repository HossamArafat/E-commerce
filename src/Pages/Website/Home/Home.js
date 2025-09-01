import Categories from "../Home/Sections/Categories";
import FeaturedProducts from "./Sections/Products/FeaturedProducts";
import Hero from "../Home/Sections/Hero";
import '../../../CSS/pages/website/style.css'

function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  );
}

export default Home
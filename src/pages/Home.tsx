import Banner from "../components/Banner"
import Banner2 from "../components/Banner2"
import Category from "../components/Category"
import Disc from "../components/Disc"
import Products from "../components/Products"
import ShopByConcern from "../components/ShopByConcern"


const Home = () => {
  return (
    <div>
        <Banner />
        <Banner2 />
        <Disc />
        <Category />
        <ShopByConcern />
        <Products />
        
    </div>
  )
}

export default Home
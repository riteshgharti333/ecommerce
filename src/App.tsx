import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import SingleOrder from "./pages/SingleOrder";
import AllProducts from "./pages/AllProducts";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      {/* Login route without Navbar/Footer */}
      <Route path="/login" element={<Login />} />
      
      {/* Routes with Navbar and Footer */}
      <Route
        path="/*"
        element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/order/:id" element={<SingleOrder />} />
                <Route path="/facewash" element={<AllProducts />} />
              </Routes>
            </main>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
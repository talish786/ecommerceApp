import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import SingleProduct from "./screens/SingleProduct";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import Shipping from "./screens/Shipping";
import Payment from "./screens/Payment";
import Order from "./screens/Order";
import OrderDetails from "./screens/OrderDetails";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/cart/:id?" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register/?" element={<Register />} />
              <Route path="/profile/" element={<Profile />} />
              <Route path="/shipping/" element={<Shipping />} />
              <Route path="/payment/" element={<Payment />} />
              <Route path="/order/" element={<Order />} />
              <Route path="/order/:id" element={<OrderDetails />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

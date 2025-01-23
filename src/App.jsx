import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Layout/Nav/Nav";
import Login from "./pages/auth/Login";
import Account from "./pages/auth/Register";
import Contact from "./pages/Contact";
import Successful from "./pages/LoginSuccess";
import Successful2 from "./pages/RegisterSuccess";
import Store from "./pages/Store";
import Home from "./pages/Home";
import "./App.css";
import Pagenotfound from "./pages/Pagenotfound";
import CartPage from "./pages/CartPage";
import Footer from "./components/Layout/Foot/Foot";
import CheckoutPage from "./pages/CheckoutPage";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/CreateCategory";
import AdminOrders from "./pages/Admin/AdminOrders";
import Users from "./pages/Admin/Users";
import AdminRoute from "./components/Routes/AdminRoute";
import Private from "./components/Routes/Private";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Service from "./pages/Service";
import { Toaster } from "react-hot-toast";

function App() {
  // added

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-success" element={<Successful />} />
          <Route path="/signup" element={<Account />} />
          <Route path="/register-success" element={<Successful2 />} />
          <Route path="/store" element={<Store />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/dashboard" element={<Private />}>
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/products" element={<CreateProduct />} />
            <Route path="admin/orders" element={<AdminOrders />} />
            <Route path="admin/category" element={<CreateCategory />} />
          </Route>

          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

import { Routes ,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import { Toaster } from 'react-hot-toast';
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profiles from "./pages/user/Profiles";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/dashboard" element={<Private/>} >
        <Route path="user" element={<Dashboard/>} />
        <Route path="user/orders" element={<Orders/>} />
        <Route path="user/profile" element={<Profiles/>} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>} >
        <Route path="admin" element={<AdminDashboard/>} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>} >
        <Route path="admin/create-category" element={<CreateCategory/>} />
        <Route path="admin/create-product" element={<CreateProduct/>} />
        <Route path="admin/users" element={<Users/>} />
      </Route>
      <Route path="/contact" element={<Contact/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/policy" element={<Policy/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/*" element={<PageNotFound/>} />
    </Routes>
    <Toaster />
    </>
  );
}

export default App;

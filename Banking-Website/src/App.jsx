import './App.css'
import { Route, Routes } from "react-router-dom";
import Auth from './pages/Auth'
import User from './pages/User';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from './pages/Admin';
import Login from './pages/Login';


function App() {
 
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  )
}

export default App


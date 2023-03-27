import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Admin from "./pages/Admin/Admin";
import Hoteles from "./pages/Admin/hoteles/hoteles";
import UserAd from "./pages/Admin/usuarios/userAd";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/hotelsAd" element={<Hoteles/>}/>
        <Route path="/usersAd" element={<UserAd/>}/>
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

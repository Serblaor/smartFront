import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHouse}from "@fortawesome/free-solid-svg-icons"


const Register = () => {
const [credentials, setCredentials] = useState({
username: "",
email: "",
password: "",
passport: "",
phone: "",
country: "",
city: "",
img: "",
});

const [mensaje, setMensaje] = useState("");
const [loading, setLoading] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

const navigate = useNavigate();

const handleChange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMensaje("");
  try {
    const response = await fetch("https://smart-2imr.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!credentials.username) {
      setMensaje("enter a valid username.");
      setLoading(false);
      return;
    } else if (!credentials.email.includes("@")) {
      setMensaje("Submit a correct email");
      setLoading(false);
      return;
    } else if (credentials.password.length < 6) {
      setMensaje("The password must have at least 6 characters");
      setLoading(false);
      return;
    } else if (credentials.passport.length < 5) {
      setMensaje("Passport number must be at least 5 characters");
      setLoading(false);
      return;
    } else if (credentials.phone.length < 7 || credentials.phone.length > 10) {
      setMensaje("Phone number must be between 7 and 10 characters");
      setLoading(false);
      return;
    } else if (response.ok) {
      setMensaje("successfully registered.");
      Swal.fire({
        title: 'Successful registration!',
        text: 'Your account has been created successfully',
        icon: 'success',
        confirmButtonText: 'Login!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      const error = await response.json();
      setMensaje(error.message);
    }
  } catch (error) {
    console.error(error);
    setMensaje("Hubo un error al registrar al usuario.");
  }
  setLoading(false);
};
const handleConfirm = () => {
  setShowConfirm(false);
  navigate("/login");
};

return (
  
  <form className="form" Submit={handleSubmit}>
    <h2 className="entrada">Start the new SmartBooking experience! 🏨   </h2>
    <input className="input"
      type="text"
      placeholder="Username"
      id="username"
      name="username"
      value={credentials.username}
      onChange={handleChange}
    />
    <input className="input"
      type="email"
      placeholder="Email"
      id="email"
      name="email"
      value={credentials.email}
      onChange={handleChange}
    />
    <input className="input"
      type="password"
      placeholder="password"
      id="password"
      name="password"
      value={credentials.password}
      onChange={handleChange}
    />
    <input className="input"
      type="text"
      placeholder="Passport ID"
      id="passport"
      name="passport"
      value={credentials.passport}
      onChange={handleChange}
    />
    <input className="input"
      type="text"
      placeholder="Phone"
      id="phone"
      name="phone"
      value={credentials.phone}
      onChange={handleChange}
    />
    <input className="input"
      type="text"
      placeholder="Country"
      id="country"
      name="country"
      value={credentials.country}
      onChange={handleChange}
    />
    <input className="input"
      type="text"
      placeholder="City"
      id="city"
      name="city"
      value={credentials.city}
      onChange={handleChange}
      title="city"
    />
    <input className="input"
      type="text"
      placeholder="img URL"
      id="img"
      name="img"
      value={credentials.img}
      onChange={handleChange}
      title="copy the link to your favorite image and paste it here"
    />
   <button className="button" type="submit" disabled={loading}>
  Register
</button>
<a className="a" href="/"> <FontAwesomeIcon icon={faHouse} /> </a>
<p>{mensaje}</p>
{showConfirm && (
  <div>
    <p>User was registered correctly.</p>
    <button className="button" onClick={handleConfirm}>Login</button>
  </div>
)}
  </form>
);
}
export default Register;

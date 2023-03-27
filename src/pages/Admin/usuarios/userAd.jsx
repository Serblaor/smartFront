import { useState } from "react";
import MyNavbar from "../../../components/navbar/Navbar";
import useFetch from "../../../hooks/useFetch";
import './userAd.css'
import swal from "sweetalert";
import axios from "axios";
import { Button } from "react-bootstrap";


const UserAd = ({ onUpdate, onDelete }) => {
  const { data: users, loading, error, reFetch } = useFetch("https://smart-2imr.onrender.com/api/users");
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    passport: "",
    country: "",
    city: "",
    gender: "",
    phone: "",
    isAdmin: false,
  });

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser({
      username: user.username,
      email: user.email,
      passport: user.passport,
      country: user.country,
      city: user.city,
      gender: user.gender,
      phone: user.phone,
      isAdmin: user.isAdmin,
    });
  };

  const handleDelete = async (user) => {
    const confirmDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
  
    if (confirmDelete) {
      await axios.delete(`https://smart-2imr.onrender.com/api/users/${user._id}`);
      swal("Poof! The user has been deleted!", {
        icon: "success",
      });
      reFetch();
    } else {
      swal("The user is safe!");
    }
  };
  
  

  const handleSave = async () => {
    if (editingUser) {   
      await axios.put(`https://smart-2imr.onrender.com/api/users/${editingUser._id}`, editingUser);
    } else {
      setNewUser({
        username: "",
        email: "",
        passport: "",
        country: "",
        city: "",
        gender: "",
        phone: "",
        isAdmin: false,
      });
    }
  };
  const handleCancel = () => {
    setEditingUser(null);
    setNewUser({
      username: "",
      email: "",
      passport: "",
      country: "",
      city: "",
      gender: "",
      phone: "",
      password: "",
      isAdmin: false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setEditingUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
    <MyNavbar/>
    <table className="tableU">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Passport</th>
          <th>Country</th>
          <th>City</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>IsAdmin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.passport}</td>
            <td>{user.country}</td>
            <td>{user.city}</td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
            <td>{user.isAdmin ? "Yes" : "No"}</td>
            <td>
              <Button style={{ height: '40px', borderRadius: '10px', backgroundColor: '#003580'}} onClick={() => handleEdit(user)}>Edit</Button>
              <Button style={{ height: '40px', borderRadius: '10px', backgroundColor: 'red'}} onClick={() => handleDelete(user)}>Delete</Button>
            </td>
          </tr>
        ))}
        {editingUser && (
          <tr>
            <td>
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="email"
                value={newUser.email}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="passport"
                value={newUser.passport}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="country"
                value={newUser.country}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="city"
                value={newUser.city}
                onChange={handleChange}
                />
                </td>
                <td>
                  <input
                    type="text"
                    name="gender"
                    value={newUser.gender}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    value={newUser.phone}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={newUser.isAdmin}
                    onChange={(e) =>
                      setNewUser((prevUser) => ({
                        ...prevUser,
                        isAdmin: e.target.checked,
                      }))
                    }
                  />
                </td>
                <td>
                  <Button style={{ height: '40px', borderRadius: '10px', backgroundColor: '#003580'}}onClick={handleSave}>Save</Button>
                  <Button style={{ height: '40px', borderRadius: '10px', backgroundColor: 'red'}}onClick={handleCancel}>Cancel</Button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </>
      );
    };
    
    export default UserAd;



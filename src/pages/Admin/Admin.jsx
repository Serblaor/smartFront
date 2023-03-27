import React from 'react'
import MyNavbar from '../../components/navbar/Navbar'
import { Link } from 'react-router-dom';
import "../Admin/Admin.css"
import { Button } from 'react-bootstrap';


function Admin() {
  return (
    <div>
        <MyNavbar/>
        <div className='principalAdmin'>
        <Link to="/hotelsAd" className="">
        <Button style={{
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#003580",
                }}>Hotels</Button >
        </Link>
        <Link to="/usersAd">
        <Button style={{
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#003580",
                }}>Users</Button>
        </Link>
        </div>
    </div>
  )
}

export default Admin


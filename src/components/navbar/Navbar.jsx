import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import './navbar.css'

const MyNavbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{background: 'linear-gradient(to bottom right, #192231, #0f1623)'}}>
      <div className="d-flex align-items-center justify-content-between w-100">
      <Navbar.Brand as={Link} to="/" style={{ color: "white", fontSize: "30px", textAlign: "center" }}>
  SmartBooking
</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user ? (
              <div className="ml-auto">
              <NavDropdown
                title={
                  <>
                    <div className="d-flex align-items-center">
                      <span className="mr-3">Hola, {user._doc.username} 😄!</span>
                      <div className="imgUser">
                        <img src={user._doc.img} alt="" className="rounded-circle" width="50" height="50" />
                      </div>
                    </div>
                  </>
                }
                id="basic-nav-dropdown"
                className="px-5"
              >
                <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket}/> Logout
                </NavDropdown.Item>
                {user._doc.isAdmin && (
                  <NavDropdown.Item as={Link} to="/admin">
                    Admin Panel
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </div>
            ) : (
              <Nav>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MyNavbar;





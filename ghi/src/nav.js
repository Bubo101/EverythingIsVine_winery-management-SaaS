import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useParams, Link } from 'react-router-dom';
import { useToken } from './auth';
import { useAuthContext } from './auth';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Navigation() {
  const { cartItems } = useSelector((state) => state.cart);
  const [logged, setLogged] = useState(false);
  const { id } = useParams();
  const { token } = useAuthContext();
/*eslint-disable */
  const [tokencall, login, logout] = useToken();
/*eslint-enable */

  function loggedIn(token) {
    if (token) {
      setLogged(true);
    }
  }
  const submitLogoutHandler = (e) => {
    e.preventDefault();
    logout(id);
    setLogged(false);

    window.location.reload();
  };

  useEffect(() => {
    loggedIn(token);
  }, [token]);

  return (
    <Navbar
      variant="dark"
      expand="lg"
      className="rounded"
      style={{ backgroundColor: 'mediumorchid' }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="/"> */}
        <Navbar.Brand href={`/`}>
          <img
            src={`${process.env.PUBLIC_URL}/Navlogo.png`}
            alt=""
            width="70px"
            style={{
              marginRight: '50px',
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <div className="px-3">
              <Link
                to={`/wineries/${id}`}
                className="btn btn-light p-2 mb-1 mt-1"
              >
                Home
              </Link>
            </div>
            <div className="px-3">
              <Link
                to={`/wineries/${id}/wines`}
                className="btn btn-light p-2 mb-1 mt-1"
              >
                Our Wines
              </Link>
            </div>
            <div className="px-3">
              <Link
                to={`/wineries/${id}/contact`}
                className="btn btn-light p-2 mb-1 mt-1"
              >
                Contact Us
              </Link>
            </div>
          </Nav>
          <Nav className="ms auto">
            <div className="px-3 me-auto justify-content-end">
              <Link
                to={`/wineries/${id}/login`}
                className={
                  'btn btn-light p-2 mb-1 mt-1' + (logged ? ' d-none' : '')
                }
              >
                Login
              </Link>
            </div>
            <div className="px-3">
              <Link
                to={`/wineries/${id}/signup`}
                className={
                  'btn btn-light p-2 mb-1 mt-1' + (logged ? ' d-none' : '')
                }
              >
                Sign Up
              </Link>
            </div>
            <div className="px-3">
              <button
                type="submit"
                className={
                  'btn btn-light p-2 mb-1 mt-1' + (logged ? '' : ' d-none')
                }
                onClick={submitLogoutHandler}
              >
                Logout
              </button>
            </div>
            <div className="widgets-wrap float-md-right">
              <div className="widget-header  mr-3">
                <Link
                  to={`wineries/${id}/shoppingcart`}
                  className="icon icon-sm rounded-circle border bg-light"
                >
                  <i className="fa fa-shopping-cart" />
                </Link>
                <span className="badge badge-pill badge-danger notify">
                  {cartItems.length}
                </span>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

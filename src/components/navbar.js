import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getProducts } from "./redux/cart";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "./redux/cart";
export default function NavbarTorob(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector((state) => state.cart.user));
  const [search, setSearch] = useState("");
  const onSearch = () => {
    axios
      .get(`http://localhost:9000/search/${search}`)
      .then((res) => {
        dispatch(getProducts(res.data.products));
        console.log(res.data.products);
        navigate("/search");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  function checkCategory(pageLoc) {
    console.log(pageLoc);
    axios
      .get(`http://localhost:9000${pageLoc}`)
      .then((res) => {
        dispatch(getProducts(res.data.products));
        console.log(res.data.products);
        navigate(pageLoc);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const logOut = () => {
    setUser({});
    dispatch(saveUser({}));
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container className="flex-column align-items-start ">
          <div className="d-flex ms-5 justify-content-between w-100">
            <div className="input-group w-50">
              <img
                src="https://torob.com/static/images/torob_logo.svg"
                alt="torob-logo"
                style={{ width: "35px", height: "35px" }}
                className="ms-2"
              />
              <h2 className="text-danger ms-3" onClick={() => navigate("/")}>
                ??????
              </h2>
              <button
                className="btn btn-danger btn-search"
                type="button"
                onClick={onSearch}
              >
                <i className="fa fa-search"></i>
              </button>
              <input
                type="text"
                className="form-control input-search"
                placeholder="?????? ???????? ???? ???????? ????????"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {user.username ? (
              <DropdownButton id="dropdown-basic-button" title={user.username}>
                <Dropdown.Item>
                  <Link to="/profile">Profile</Link>{" "}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => logOut()}>Log out</Dropdown.Item>
              </DropdownButton>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/signup")}
              >
                ?????? ?????? ???? ????????
              </button>
            )}
          </div>{" "}
          <Nav className="mt-3">
            <NavDropdown title="????????????" className="me-5">
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/mobile");
                  }}
                >
                  ???????? ????????????{" "}
                </button>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/mobile/samsung");
                  }}
                >
                  ???????? ??????????????{" "}
                </button>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/mobile/xiaomi");
                  }}
                >
                  ???????? ??????????????
                </button>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/mobile/apple");
                  }}
                >
                  ???????? ??????
                </button>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="????????" className="me-5">
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/tablet");
                  }}
                >
                  ????????
                </button>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/tablet/samsung");
                  }}
                >
                  ???????? ??????????????
                </button>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/tablet/xiaomi");
                  }}
                >
                  ???????? ??????????????
                </button>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/tablet/apple");
                  }}
                >
                  ???????? ??????
                </button>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="???? ??????" className="me-5">
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/laptop");
                  }}
                >
                  ???? ?????? ?? ?????? ??????{" "}
                </button>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/laptop/lenovo");
                  }}
                >
                  ???? ?????? ????????
                </button>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/laptop/asus");
                  }}
                >
                  ???? ?????? ??????????
                </button>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <button
                  className="nav-link nav-button"
                  onClick={() => {
                    checkCategory("/laptop/apple");
                  }}
                >
                  ???? ?????? ??????
                </button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

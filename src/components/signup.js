import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function Signup(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("normal");
  const [wrong, setWrong] = useState(false);
  const onSubmitForm = (e) => {
    e.preventDefault();
    let user = {
      email,
      password,
      username,
      role,
    };
    console.log(user);
    axios
      .post(`http://localhost:9000/signup/`, { ...user })
      .then((res) => {
        console.log(res.data);
        setWrong(false);
        navigate("/login");
      })
      .catch((e) => {
        setWrong(true);
        console.log(e);
      });
  };
  return (
    <>
      <div className="signup-bg d-flex justify-content-center align-items-center">
        <div className="signup rounded py-3 d-flex flex-column justify-content-center align-items-center ">
          <div
            className="torob-logo d-flex align-items-center"
            onClick={() => navigate("/")}
          >
            <img
              src="https://torob.com/static/images/torob_logo.svg"
              alt="torob-logo"
              style={{ width: "35px", height: "35px" }}
              className="ms-2"
            />
            <h2 className="text-danger ms-3 fs-1">ترب</h2>
          </div>
          {wrong ? (
            <div class="alert alert-danger mb-0 mt-2" role="alert">
              ایمیل یا نام کاربری تکراری میباشد
            </div>
          ) : (
            ""
          )}
          <Form
            className=" py-5 d-flex flex-column justify-content-center align-items-center"
            onSubmit={onSubmitForm}
          >
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>نام کاربری</Form.Label>
              <Form.Control
                type="text"
                placeholder="نام کاربری را وارد کنید"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>ایمیل</Form.Label>
              <Form.Control
                type="email"
                placeholder="ایمیل را وارد کنید"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {role === "normal" ? (
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>شماره</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="شماره را وارد کنید"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>شماره</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="شماره را وارد کنید"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>رمز عبور</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="کلمه عبور را وارد کنید"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                onChange={(e) => setPassword(e.target.value)}
                required
              />{" "}
              <input
                className="ms-2 mt-2"
                type="checkbox"
                onClick={(e) => {
                  e.target.checked
                    ? setShowPassword(true)
                    : setShowPassword(false);
                }}
                name="showPass"
              />
              <label htmlFor="showPass">نمایش رمز عبور</label>
            </Form.Group>
            <select
              class="form-select mb-2"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="normal" selected>
                خریدار
              </option>
              <option value="store">فروشنده</option>
            </select>
            <Button variant="danger" type="submit">
              ثبت نام
            </Button>
            <div className="d-flex mt-4">
              <p>قبلا ثبت نام کرده اید؟</p>
              <Link className="me-2 link-login" to="/login">
                ورود
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NavbarTorob from "./navbar";
import { useSelector, useDispatch } from "react-redux";
export default function ProductDetail(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const product = useSelector((state) => state.cart.selectedProduct);
  const navigate = useNavigate();
  return (
    <>
      <NavbarTorob />
      <div className="product-detail-main d-flex justify-content-between">
        <div className="w-75 bg-gray">
          <div className="bg-white product-name-row d-flex align-items-center px-5 py-4">
            <div>
              <img className="product-detail-image" src={product.img} alt="" />
            </div>{" "}
            <div>
              <h2>{product.name}</h2>
              <p className="text-danger">
                قیمت از {product.low_price} تا {product.high_price}
              </p>
            </div>
          </div>
          <div className="bg-white d-flex flex-column mt-4 p-4 ">
            <div className="d-flex justify-content-between align-items-center p-4 border">
              <div>
                <p className="m-0">هیماشاپ</p>
                <p className="m-0 text-secondary">تهران</p>
              </div>
              <div>
                <p className="text-danger">۴۵,۰۰۰,۰۰۰ تومان</p>
              </div>
              <div>
                <button
                  className="btn btn-outline-warning"
                  onClick={handleShow}
                >
                  گزارش
                </button>
                <button className="btn btn-outline-danger">
                  خرید اینترنتی
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-20 bg-white p-4">
          <h3>مشخصات کلی</h3>
          <hr />
          <div>
            <p className="m-0">ابعاد</p>
            <p className="text-secondary">150.9x75.7x8.3 میلیمتر</p>
          </div>
          <div>
            <p className="m-0">وزن</p>
            <p className="text-secondary">194 گرم</p>
          </div>

          <div>
            <p className="m-0">ویژگیهای ظاهری</p>
            <p className="text-secondary">
              فریم دور آلومینیومی سری 7000, پشت دستگاه گلس, دارای گواهینامه IP68
              مقاوم در برابر آب و گرد و غبار
            </p>
          </div>
          <div>
            <p className="m-0">سیم کارت</p>
            <p className="text-secondary">دو سیم کارت, Nano SIM</p>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>گزارش</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center p-1 mb-4">
            <img className="product-detail-image" src={product.img} alt="" />
            <div>
              <h2>هیماشاپ</h2>
              <h5>{product.name}</h5>
            </div>
          </div>
          <div class="form-check checkbox-rounded checkbox-cerulean-blue-filled w-50">
            <label class="form-check-label" for="roundedExample3">
              قیمت کالا صحیح نیست.
            </label>
            <input
              type="checkbox"
              class="form-check-input "
              id="roundedExample3"
            />
          </div>
          <div class="form-check checkbox-rounded checkbox-cerulean-blue-filled w-50">
            <input
              type="checkbox"
              class="form-check-input "
              id="roundedExample3"
            />
            <label class="form-check-label" for="roundedExample3">
              کالا موجود نیست.
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="danger" onClick={handleClose}>
            انصراف
          </Button>
          <Button variant="primary" onClick={handleClose}>
            ثبت گزارش
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

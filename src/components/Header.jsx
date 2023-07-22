"use client";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cartTotal } from "@/features/cart/cartSlice";

function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartTotal());
  }, [cart, dispatch]);
  return (
    <nav className="navbar navbar-expand navbar-light bg-info w-100 mb-5">
      <Link href="/" className="navbar-brand">
        <p className="h4  text-white  text-bolder ">
          <span className="logo-letter">O</span>nline
          <span className="logo-letter"> S</span>tore
        </p>
      </Link>

      <div className="collapse navbar-collapse " id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto font-weight-bold">
          <li className="nav-item  ">
            <Link href="/cart" className="nav-link mr-2">
              <span>
                {cartTotalQuantity}
                <AiOutlineShoppingCart size="30px" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;

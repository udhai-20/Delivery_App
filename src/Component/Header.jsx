import React, { useState } from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase.cofig";
import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useStateValue } from "../Context/stateProvider";
import { actionType } from "../Context/reducer";
function Header(props) {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [popup, setPopup] = useState(false);
  const [{ user, cartShow, cartItem }, dispatch] = useStateValue();
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("User-details", JSON.stringify(providerData[0]));
    } else {
      setPopup(!popup);
    }
  };
  // console.log("out-inside:", popup);
  const logout = () => {
    console.log("inside:", popup);
    setPopup(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  const cartpopup = () => {
    console.log("trigger cartpopup");
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  // p-6 px-16
  return (
    <header className=" fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* {desktop&tablet} */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="Logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <Link to="/">
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Home
              </li>
            </Link>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Services
            </li>
          </motion.ul>
          <div className=" relative flex items-center justify-center">
            <AiOutlineShoppingCart
              className="text-textColor text-2xl cursor-pointer"
              onClick={cartpopup}
            />
            {cartItem && cartItem.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItem.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px]  min-h-[40px] drop-shadow-2xl rounded-full"
              src={user ? user.photoURL : Avatar}
              alt="user-profile"
              onClick={login}
            />
            {popup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="flex flex-col absolute  top-15 py-3 px-3 right-0 w-48 bg-gray-200"
              >
                {user && user.email === "udhayaprakash122@gmail.com" && (
                  <Link to="/createItem">
                    <p
                      className="flex items-center gap-3 cursor-default hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor "
                      onClick={() => setPopup(false)}
                    >
                      Create Iteams <AiFillPlusCircle />
                    </p>
                  </Link>
                )}
                <p
                  onClick={logout}
                  className="flex items-center gap-3 cursor-default hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor "
                >
                  Logout <AiOutlineLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* {mobile */}
      <div className="flex justify-between md:hidden w-full h-full ">
        <div className=" relative flex items-center justify-center">
          {/* carticon */}
          <AiOutlineShoppingCart
            className="text-textColor text-2xl cursor-pointer"
            onClick={cartpopup}
          />
          {cartItem && cartItem.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItem.length}
              </p>
            </div>
          )}
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="Logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px]  min-h-[40px] drop-shadow-2xl rounded-full"
            src={user ? user.photoURL : Avatar}
            alt="user-profile"
            onClick={login}
          />
          {popup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="flex flex-col absolute  top-15 py-3 px-3 right-0 w-48 bg-gray-200"
            >
              {user && user.email === "udhayaprakash122@gmail.com" && (
                <Link to="/createItem">
                  <p
                    className="flex items-center gap-3 cursor-default hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor "
                    onClick={() => setPopup(false)}
                  >
                    Create Iteams <AiFillPlusCircle />
                  </p>
                </Link>
              )}

              {/* /add hear tghe other menus */}
              <ul className="flex flex-col  px-4 py-2 ">
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer   py-2"
                  onClick={() => setPopup(false)}
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer   py-2"
                  onClick={() => setPopup(false)}
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer py-2"
                  onClick={() => setPopup(false)}
                >
                  {" "}
                  About
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer py-2"
                  onClick={() => setPopup(false)}
                >
                  Services
                </li>
              </ul>

              <p
                onClick={logout}
                className="flex items-center gap-3 cursor-default hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor ml-5 bg-gray-300 px-3
                reound-md shadow-lg"
              >
                Logout <AiOutlineLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

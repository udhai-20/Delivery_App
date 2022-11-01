import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";

import { useStateValue } from "../Context/stateProvider";
import { actionType } from "../Context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartIteams from "./CartIteams";
import { useNavigate } from "react-router-dom";

function CartContainer(props) {
  const [{ cartShow, user, cartItem }, dispatch] = useStateValue();
  console.log("cartItem:", cartItem);
  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(1);
  const navigate = useNavigate();
  const closeCartPopup = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };
  useEffect(() => {
    let totlPrice = cartItem.reduce((acc, i) => {
      return acc + i.qty * i.price;
    }, 0);
    setTotal(totlPrice);
  }, [total, flag]);

  const clearCart = () => {
    // console.log("clear cart inside");
    localStorage.setItem("Cart-details", JSON.stringify([]));
    dispatch({
      type: actionType.SET_CART_ITEAMS,
      cartItem: [],
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className=" fixed right-0 top-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.5 }}
          className=" flex items-center justify-between p-4"
        >
          <MdOutlineKeyboardBackspace
            className="text-3xl text-textColor cursor-pointer"
            onClick={closeCartPopup}
          />
        </motion.div>
        <motion.p
          whileTap={{ scale: 0.5 }}
          className="text-textColor text-lg font-semibold"
        >
          Cart
        </motion.p>
        <motion.p
          whileTap={{ scale: 0.5 }}
          className="flex items-center gap-2 p-1 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor"
          onClick={() => clearCart()}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {/* //bottom section */}

      {/* cart empty message */}
      {cartItem && cartItem.length > 0 ? (
        <div className="w-full h-full rounded-t-[2rem] flex flex-col bg-cartBg">
          {/* //cart items section  */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex-col gap-4 overflow-y-scroll scrollbar-none">
            {/* //cart items div */}
            {cartItem &&
              cartItem.map((el) => {
                return (
                  <CartIteams
                    key={el.id}
                    el={el}
                    flag={flag}
                    setFlag={setFlag}
                  />
                );
              })}
          </div>
          {/* cart empty message */}

          {/* //cart tota section  */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem flex flex-col iteams-center justifiy-evenly px-8 py-2 gap-5">
            <div className="flex justify-between items-center w-full">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">${total}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$3.3</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-gray-50 text-lg">Total</p>
              <p className="text-gray-50 text-lg">${total + 3.3}</p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={() => navigate("/CartSection")}
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg "
              >
                Login
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="" className="w-300" />
          <p className="text-headingColor text-lg  bg-orange-50 px-5">
            Add iteams to cart +
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default CartContainer;

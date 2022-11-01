import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/stateProvider";
import { actionType } from "../Context/reducer";
let items = [];
function CartIteams({ el, flag, setFlag }) {
  const [{ cartItem }, dispatch] = useStateValue();
  const [qty, setQty] = useState(el.qty);
  // const [iteams, setIteams] = useState([]);

  const cartDsipatch = () => {
    // console.log("iteams:", ...iteams);
    localStorage.setItem("Cartdetails", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEAMS,
      cartItem: items,
    });
  };
  const updateQty = (action, id) => {
    // console.log("add outside add", action);
    if (action === "add") {
      // console.log("add inside ");
      setQty(qty + 1);
      cartItem.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDsipatch();
    } else {
      if (qty === 1) {
        items = cartItem.filter((el) => el.id !== id);
        // console.log("found:", found);
        // setIteams(found);
        cartDsipatch();
        setFlag(flag + 1);
      } else {
        setQty(qty - 1);
        cartItem.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            // console.log(item.qty, qty);
            setFlag(flag + 1);
          }
        });
        cartDsipatch();
      }
    }
  };
  useEffect(() => {
    items = cartItem;
  }, [qty, items]);
  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2 my-2">
      <img
        src={el.imageURL}
        alt={el.title}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
      />
      {/* name Section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50 font-semibold">{el?.title}</p>
        <p className="text-base text-gray-300 font-semibold">
          ${qty * el?.price}
        </p>
      </div>
      {/* button section + 1 -*/}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }}>
          <BiMinus
            className="text-gray-50"
            onClick={() => updateQty("ded", el?.id)}
          />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <motion.div whileTap={{ scale: 0.75 }}>
          <BiPlus
            className="text-gray-50"
            onClick={() => updateQty("add", el?.id)}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default CartIteams;

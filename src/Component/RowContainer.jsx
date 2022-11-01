import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useCallback,
} from "react";
import { MdShoppingBasket } from "react-icons/md";
import NotFound from "../img/NotFound.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../Context/stateProvider";
import { actionType } from "../Context/reducer";
import axios from "axios";
function RowContainer({ flag, Data, scrollValue }) {
  const [{ cartItem }, dispatch] = useStateValue();
  const [trackiteams, setTrackIteams] = useState([]);

  const rowContainer = useRef();
  const addToCart = () => {
    // axios
    //   .post(`http://localhost:7000/CartItems`, trackiteams)
    //   .then((r) =>
    //     dispatch({
    //       type: actionType.SET_CART_ITEAMS,
    //       cartItem: trackiteams,
    //     })
    //   )
    //   .catch((ERR) => console.log("err"));
    localStorage.setItem("Cartdetails", JSON.stringify(trackiteams));
    dispatch({
      type: actionType.SET_CART_ITEAMS,
      cartItem: trackiteams,
    });
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);
  useEffect(() => {
    addToCart();
  }, [trackiteams]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center justify-center gap-3 my-12 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-y-scroll flex-wrap"
      }`}
    >
      {Data && Data.length > 0 ? (
        Data.map((el) => {
          return (
            <div
              key={el.id}
              className="w-275 min-w-[300px] md:w-340 md:min-w-[340px] h-[235 px] my-12 bg-cardOverlay rounded-none-lg p-2 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-center"
            >
              <div className="w-full flex  items-center justify-between">
                <motion.div
                  className="w-40 h-40 drop-shadow-2xl"
                  whileTap={{ scale: 0.75 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <img
                    src={el.imageURL}
                    alt="dummy"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                >
                  <MdShoppingBasket
                    className="text-white"
                    onClick={() => setTrackIteams([...cartItem, el])}
                  />
                </motion.div>
              </div>
              <div className="w-full flex flex-col items-end justify-end">
                <p className="text-textColor font-semibold text-base md:text-lg ">
                  {el.title}
                </p>
                <p className="text-textColor mt-1 text-sm">
                  {el.calories} calories
                </p>
                <div className="flex items-center gap-8">
                  <p className="text-lg text-headingColor font-semibold">
                    <span className="text-sm text-red-500">$</span>
                    {el.price}
                  </p>
                </div>
                <Link to={`/Product_desc/${el.id}`}>BuyNow</Link>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full flex items-center justify-center mt-11">
          <img src={NotFound} alt="emty image" className="h-420" />
          <p className="bg-gray-500 bg-center p-3 ml-8 text-red-50 absolute capitalize -mt-11 text-xl">
            Item Not Found
          </p>
        </div>
      )}
    </div>
  );
}

export default RowContainer;

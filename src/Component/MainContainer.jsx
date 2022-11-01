import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import HomeContainer from "./HomeContainer";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../Context/stateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

function MainContainer(props) {
  const [{ foodIteams, cartShow }, dispatch] = useStateValue();
  const [datafilter, setdataFilter] = useState([]);
  const [scrollValue, setscrollValue] = useState(0);
  // console.log("scrollValue:", scrollValue);

  const handleScrollvalue = (val) => {
    setscrollValue(val + scrollValue);
  };
  useEffect(() => {}, [scrollValue]);
  // const rowContainerRef = useRef();
  // const scroll = (scrolloffset) => {
  //   rowContainerRef.current.scrollLeft += scrolloffset;
  // };
  // console.log("foodIteams:", foodIteams);
  const handlefilterdata = (foodIteams) => {
    // console.log("foodIteams:", foodIteams);
    const founds = foodIteams?.filter((n) => {
      return n.catagory === "Fruits";
    });
    setdataFilter(founds);
    // console.log("founds:", founds);
  };

  useEffect(() => {
    handlefilterdata(foodIteams);
  }, [foodIteams]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start ">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold text-headingColor relative capitalize before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to to-orange-600 transition-all ease-in-out duration-100">
            Our fresh & health fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-auto shadow-lg ease-in-out flex items-center justify-center duration-100"
            >
              <MdChevronLeft
                className="text-lg text-white"
                onClick={() => handleScrollvalue(-200)}
              />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-auto shadow-lg ease-in-out flex items-center justify-center duration-100"
            >
              <MdChevronRight
                className="text-lg text-white"
                onClick={() => handleScrollvalue(200)}
              />
            </motion.div>
          </div>
        </div>
        <RowContainer scrollValue={scrollValue} flag={true} Data={datafilter} />
      </section>
      {/* //menusection */}
      <MenuContainer />
      {/* catrtsection */}
      {cartShow && <CartContainer />}
    </div>
  );
}

export default MainContainer;

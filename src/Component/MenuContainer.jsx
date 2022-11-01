import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../Context/stateProvider";
function MenuContainer(props) {
  const [filter, setFilter] = useState("chicken");
  const [{ foodIteams }, dispatch] = useStateValue();
  useEffect(() => {}, [filter]);
  // console.log("filter:", filter);
  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold text-headingColor relative capitalize before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Hot Dishes
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 mt-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((el) => {
              return (
                <motion.div
                  whileTap={{ scale: 0.7 }}
                  key={el.id}
                  className={`group ${
                    filter === el.urlParamName ? "bg-cartNumBg" : "bg-white"
                  } w-24 h-28 min-w-[94px] cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-red-600 `}
                  onClick={() => setFilter(el.urlParamName)}
                >
                  <div
                    className={`w-10 h-10 rounded-full shadow-lg ${
                      filter === el.urlParamName ? "bg-white" : "bg-cartNumBg"
                    } group-hover:bg-card flex items-center justify-center shadow-lg`}
                  >
                    <IoFastFood
                      className={`${
                        filter === el.urlParamName
                          ? "text-textColor"
                          : "text-white"
                      } group-hover:text-textColor`}
                    />
                  </div>
                  <p
                    className={` ${
                      filter === el.urlParamName
                        ? "text-white"
                        : "text-textColor"
                    }text-lg group-hover:text-white`}
                  >
                    {el.urlParamName}
                  </p>
                </motion.div>
              );
            })}
        </div>
        <div className="w-full">
          <RowContainer
            flag={false}
            Data={foodIteams?.filter((el) => el.catagory === filter)}
          />
        </div>
      </div>
    </section>
  );
}

export default MenuContainer;

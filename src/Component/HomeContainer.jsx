import React from "react";
import Delivery from "../img/delivery.png";
import Hero from "../img/heroBg.png";
import { heroData } from "../utils/data";
function HomeContainer(props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="py-2 flex-1 flex flex-col items-start  justify-center">
        <div className="flex items-center gap-2 bg-orange-100 p-2 rounded-full px-4 py-2">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl md:text-[2.0rem]">
            <img
              className="w-full h-full object-contain"
              src={Delivery}
              alt="Bike img"
            />
          </div>
        </div>
        <p className="text-[3rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery In{" "}
          <span className="text-orange-600 text-[3.5rem] lg:text-[5.0rem] t">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left">
          Cross-country cycling is defined by the terrain on which it is
          performed. XC courses and trails consist of a mix of rough forest
          paths and singletrack (also referred to as doubletrack depending on
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 mt-2 rounded-lg hover:shadow-lg transition-all ease-in-out 
          duration-100 md:w-auto"
        >
          Order Now
        </button>
      </div>
      <div className="py-2  flex-1 flex items-center relative">
        <img
          src={Hero}
          alt="heroimage"
          className="lg:h-650 w-full lg:w-auto h-370 ml-auto"
        />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 flex-wrap  gap-4">
          {heroData &&
            heroData.map((el) => {
              return (
                <div
                  key={el.id}
                  className="bg-cardOverlay lg:w-200 p-4 backdrop-blur-md rounded-lg flex flex-col items-center justify-center "
                >
                  <img
                    src={el.Imge}
                    alt="ice-cream"
                    className="w-20 lg:w-40 lg:-mt-20 -mt:10"
                  />
                  <p className="lg:text-xl text-base font-semibold text-textColor lg:mt-4 mt-2">
                    {el.name}
                  </p>
                  <p className="lg:text-sm text-[10px] text-lighttextGray lg:my-3 my-0">
                    {el.descp}
                  </p>
                  <p className="text-sm text-lighttextGray font-semibold ">
                    <span className="text-xs text-red-600">${el.price}</span>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;

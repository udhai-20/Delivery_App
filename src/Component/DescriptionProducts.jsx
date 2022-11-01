import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStateValue } from "../Context/stateProvider";
function DescriptionProducts(props) {
  const [singleData, setSingleData] = useState([]);
  let { id } = useParams();
  console.log("id:", id);
  const [{ foodIteams }] = useStateValue();
  //   console.log("foodIteams:", foodIteams);
  const handleFilter = () => {
    console.log("inside function");
    const filterData = foodIteams?.filter((el) => {
      return el.id === id;
    });
    console.log("filterData:", filterData);
    setSingleData(filterData);
  };

  useEffect(() => {
    console.log("check");
    handleFilter();
  }, []);
  console.log("singleData:", singleData);
  return (
    <>
      {singleData &&
        singleData.map((el) => {
          return (
            <div
              key={el.id}
              className="-ml-0.2 mb-4  md:-ml-5 absolute mt-8 w-[95%] w-100 md:flex items-center justify-between   h-420"
            >
              <div className="bg-blue-50 flex items-center m-auto border-4 md:w-[50%] w-[90%]  h-420">
                <img
                  src={el.imageURL}
                  alt="sdsd"
                  className="w-350 m-auto object-cover"
                />
              </div>
              <div className=" text-center bg-blue-50 flex-1 flex-col  border-4 h-420">
                <h1 className="text-lg uppercase">{el.title}</h1>
                <div className="relative flex justify-between w-350 items-center m-auto mt-5 md:mt-5 text-center bg-blue-50">
                  <p className="w-full text-lg">
                    The useParams hook returns an object of key/value pairs of
                    the dynamic params from the current URL that were matched by
                    the. Child routes inherit all params from their parent
                    routes.
                  </p>
                </div>
                <div className="flex flext-left flex-col auto justify-between w-[200px] m-auto text-lg mt-2 md:mt-5 ">
                  <p>calories: ${el.calories}</p>
                  <p>Price: ${el.price}</p>
                  <Link to="/Cartsection">
                    <button className="button  bg-gray-800 text-white border-4 p-2">
                      Buy Now
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="button  bg-gray-800 text-white border-4 p-2">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default DescriptionProducts;
{
}

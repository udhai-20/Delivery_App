import React from "react";
import { Routes, Route } from "react-router-dom";
import { CreateContainer, MainContainer } from "../Component";
import DescriptionProducts from "../Component/DescriptionProducts";
import CartSection from "../Component/CartSection";

function AllRoutes(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/createItem" element={<CreateContainer />} />
        <Route path="/Product_desc/:id" element={<DescriptionProducts />} />
        <Route path="/CartSection" element={<CartSection />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;

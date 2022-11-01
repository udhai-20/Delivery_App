import axios from "axios";
import { useState } from "react";

export const localUserdata = () => {
  const userInfo =
    localStorage.getItem("User-details") !== "undefined"
      ? JSON.parse(localStorage.getItem("User-details"))
      : localStorage.clear();

  return userInfo;
};

export const localCartdata = () => {
  const cartInfo =
    localStorage.getItem("Cartdetails") == "undefined"
      ? localStorage.clear()
      : JSON.parse(localStorage.getItem("Cartdetails"));

  return cartInfo ? cartInfo : [];
};

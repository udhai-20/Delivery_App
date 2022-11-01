import { localCartdata, localUserdata } from "../utils/localStorage";
import axios from "axios";
import { useEffect } from "react";
const userInfo = localUserdata();
const cartInfo = localCartdata();

// let data = [];
// export const GetData = () => {
//   data = axios
//     .get(`http://localhost:7000/CartItems`)
//     .then((r) => console.log(r.data));
// };

export const initialState = {
  user: userInfo,
  foodIteams: null,
  cartShow: false,
  cartItem: cartInfo,
};

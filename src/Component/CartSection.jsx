import { background } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./Carsection.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../Context/stateProvider";
let initial = {
  firstname: "",
  lastname: "",
  phNumber: "",
  emailaddress: "",
  address: "",
  city: "",
  state: "",
  code: "",
};
function CartSection(props) {
  const [data, setData] = useState(initial);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  let navigate = useNavigate();
  const [{ cartShow, user, cartItem }, dispatch] = useStateValue();
  useEffect(() => {
    let totlPrice = cartItem.reduce((acc, i) => {
      return acc + i.qty * i.price;
    }, 0);
    setTotal(totlPrice);
  }, [total]);
  console.log("data:", data.firstname);
  const handleOrder = () => {
    setOrder(data);
    setTimeout(() => {
      alert(`${data && data.firstname} your order Placed Sucessfully`);
    }, 1000);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    console.log("name:", name);
    setData({ ...data, [name]: value });
  };
  console.log("data:", data);
  const { firstname, lastname, phNumber, email, address, city, state, code } =
    data;
  return (
    <div id="outer">
      <div id="left">
        <div id="inside_input">
          <div id="input_divd">
            <div>
              <label>FirstName</label>
              <br></br>
              <input
                className="input_box"
                placeholder="FirstName"
                name="firstname"
                value={firstname}
                onChange={handleUpdate}
              />
            </div>
            <div>
              <label>LastName</label>
              <br></br>
              <input
                className="input_box"
                placeholder="Last Name"
                name="lastname"
                value={lastname}
                onChange={handleUpdate}
              />
            </div>
          </div>
        </div>
        <div id="inside_input">
          <div id="input_divd">
            <div>
              <label>Phone Number</label>
              <br></br>
              <input
                className="input_box"
                placeholder="Ph.Number"
                name="phNumber"
                value={phNumber}
                onChange={handleUpdate}
              />
            </div>
            <div>
              <label>EmailAdress</label>
              <br></br>
              <input
                type="email"
                className="input_box"
                name="email"
                placeholder="FirstName"
                value={email}
                onChange={handleUpdate}
              />
            </div>
          </div>
        </div>
        <div id="address_parent">
          <label>Full Address</label>
          <input
            id="address"
            name="address"
            value={address}
            onChange={handleUpdate}
          />
        </div>
        <div id="zip_code">
          <div id="city_state">
            <label>City </label>
            <input value={city} name="city" onChange={handleUpdate} />
          </div>
          <div id="city_state">
            <label>State </label>
            <input value={state} name="state" onChange={handleUpdate} />
          </div>
          <div id="city_state">
            <label>ZipCode </label>
            <input value={code} name="code" onChange={handleUpdate} />
          </div>
        </div>
        <div id="btn">
          <button
            style={{ width: "auto", background: "white", padding: "5px" }}
            onClick={handleOrder}
          >
            PlaceOrder
          </button>
        </div>
      </div>

      <div id="Right">
        <div id="outer_table">
          <div id="Right_inner-1">
            <p>Product</p>
            <p>Price</p>
            <p>Qty</p>
            <p>Total</p>
          </div>
          {cartItem &&
            cartItem.length > 0 &&
            cartItem.map((el) => {
              return (
                <div key={el.id} id="Right_inner-1">
                  <p>{el.title}</p>
                  <p>${el.price}</p>
                  <p>{el.qty}</p>
                  <p>${el.qty * el.price}</p>
                </div>
              );
            })}

          {/* <div id="Right_inner-1">
            <p>Pomogrante</p>
            <p>$5</p>
            <p>10</p>
            <p>50</p>
          </div> */}
          <div id="Right_inner-2">
            <p></p>
            <p></p>
            <p>Grand Total</p>
            <p>${total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSection;

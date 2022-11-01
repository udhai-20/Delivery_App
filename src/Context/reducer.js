export const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEAMS: "SET_FOOD_ITEAMS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CART_ITEAMS: "SET_CART_ITEAMS",
};

const reducer = (state, action) => {
  console.log("action:", action);
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_FOOD_ITEAMS:
      return {
        ...state,
        foodIteams: action.foodIteams,
      };
    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };
    case actionType.SET_CART_ITEAMS:
      return {
        ...state,
        cartItem: action.cartItem,
      };
    default:
      return;
  }
};

export default reducer;

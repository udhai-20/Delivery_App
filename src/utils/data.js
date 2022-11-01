import I1 from "../img/i1.png";
import F1 from "../img/f1.png";
import C3 from "../img/c3.png";
import Fi from "../img/fi1.png";
const heroData = [
  {
    id: 1,
    name: `Icecreame`,
    descp: `chocolate & Vanilla`,
    price: `5.25`,
    Imge: I1,
  },
  {
    id: 2,
    name: `Strawberries`,
    descp: `Fresh Strawberries`,
    price: `15.25`,
    Imge: F1,
  },
  {
    id: 3,
    name: `Chicken Kebab`,
    descp: `Mixed Kebab Plate`,
    price: `25.25`,
    Imge: C3,
  },
  {
    id: 4,
    name: `Fish Kebab`,
    descp: `Fish Kebab Plate`,
    price: `25.25`,
    Imge: Fi,
  },
];
const categories = [
  {
    id: 1,
    name: "Chicken",
    urlParamName: "chicken",
  },
  {
    id: 2,
    name: "Curry",
    urlParamName: "curry",
  },
  {
    id: 3,
    name: "Rice",
    urlParamName: "rice",
  },
  {
    id: 4,
    name: "Fish",
    urlParamName: "fish",
  },
  {
    id: 5,
    name: "Fruits",
    urlParamName: "Fruits",
  },
  {
    id: 6,
    name: "Icecreams",
    urlParamName: "Icecreams",
  },

  {
    id: 7,
    name: "Soft Drinks",
    urlParamName: "drinks",
  },
];

export { heroData, categories };

import { Header } from "./Component";
import AllRoutes from "./Router/AllRoutes";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./Context/stateProvider";
import { getAllFoodItems } from "./utils/firebaseData";
import { useEffect } from "react";
import { actionType } from "./Context/reducer";

const App = () => {
  const [{ foodIteams }, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEAMS,
        foodIteams: data,
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AnimatePresence exitBeforEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 w-full">
          <AllRoutes />
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;

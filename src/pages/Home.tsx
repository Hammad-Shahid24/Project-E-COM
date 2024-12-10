import { FC } from "react";
import Services from "../components/HomePage/Services";
import Discount from "../components/HomePage/Discount";

const Home: FC = () => {
  return (
    <div className="w-full mx-auto   ">
      <Services />
      <Discount />
    </div>
  );
};

export default Home;

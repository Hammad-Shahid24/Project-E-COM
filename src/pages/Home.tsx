import { FC } from "react";
import Carousel from "../components/HomePage/Carousel";
import Services from "../components/HomePage/Services";
import Discount from "../components/HomePage/Discount";

const Home: FC = () => {
  return (
    <div className="w-full mx-auto   ">
      <Carousel />
      <Services />
      <Discount />
    </div>
  );
};

export default Home;

import { FC } from "react";
import { useLocation } from "react-router-dom";

// import AnimatedSection from "../components/AnimatedSection";
// import { useTranslation } from "react-i18next";

const CollectionPages: FC = () => {
  //   const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path);
  return (
    <div className="w-full mx-auto">
      <h1>Collection Pages</h1>
    </div>
  );
};

export default CollectionPages;

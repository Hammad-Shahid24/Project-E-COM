import { FC } from "react";

// import AnimatedSection from "../components/AnimatedSection";
import { useTranslation } from "react-i18next";

const CollectionPages: FC = () => {
  const { t } = useTranslation();
  return <div className="w-full mx-auto">{t("header")}</div>;
};

export default CollectionPages;

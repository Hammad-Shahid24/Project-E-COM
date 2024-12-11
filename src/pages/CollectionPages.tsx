import { FC } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../components/CollectionPages/Banner";
import { useTranslation } from "react-i18next";
import skincarebg from "../assets/Coll-Pgs/moisturizer.jpg";
import serumImg from "../assets/Coll-Pgs/serum.jpg";

const CollectionPages: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname.split("/")[1] as keyof typeof bannerData;

  const bannerData = {
    "best-sellers": {
      heading: t("header.bestsellers"),
    },
    "new-arrivals": {
      heading: t("header.newarrivals"),
    },
    "skin-care": {
      heading: t("collectionsPage.banners.skincareheading"),
      description: t("collectionsPage.banners.skincaredetail"),
      bgImage: skincarebg,
    },
    "face-mask": {
      heading: t("collectionsPage.banners.facemaskheading"),
      description: t("collectionsPage.banners.facemaskdetail"),
      bgImage: serumImg,
    },
    "texture-and-makeup": {
      heading: t("collectionsPage.banners.textureandmakeupheading"),
      description: t("collectionsPage.banners.textureandmakeupdetail"),
      bgImage: skincarebg,
    },
  };

  const bannerProps = bannerData[path];

  return (
    <div className="w-full mx-auto">
      {bannerProps && <Banner {...bannerProps} />}
    </div>
  );
};

export default CollectionPages;

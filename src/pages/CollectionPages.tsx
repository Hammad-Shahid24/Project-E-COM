import { FC, useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/CollectionPages/Banner";
import StickyFilter from "../components/CollectionPages/StickyFilter";
import { useTranslation } from "react-i18next";
import skincarebg from "../assets/Coll-Pgs/moisturizer.jpg";
import serumImg from "../assets/Coll-Pgs/serum.jpg";
import ProductCard from "../components/CollectionPages/ProductCard";
import Pagination from "../components/CollectionPages/Pagination";
import { fetchAllProducts, fetchFilteredProducts, resetProducts } from "../redux/products/productSlice";
import { RootState, AppDispatch } from "../app/store";
import Loading from "../shared/Loading";
import { Product } from "../types/Shopping";

const CollectionPages: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const path = location.pathname.split("/")[1] as keyof typeof bannerData;
  const categoryId = location.pathname.split("/")[2];
  const pageSize = 3;

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageProducts, setCurrentPageProducts] = useState<Product[]>([]);
  const [sortKey, setSortKey] = useState<keyof Product | string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { products, loading, error, totalProducts } = useSelector((state: RootState) => state.products);

  // Mapping paths to tags
  const pathToTagMap: { [key: string]: string } = {
    "best-sellers": "Best Sellers",
    "new-arrivals": "New Arrivals",
    "skin-care": "Skin Care",
    "face-mask": "Face Mask",
    "texture-and-makeup": "Texture and Makeup",
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchAllProducts({ categoryId, pageSize: pageSize }));
    
    return () => {
      dispatch(resetProducts());
    };
  }, []);


  // Memoize bannerData to avoid unnecessary recalculations on every render
  const bannerData = useMemo(
    () => ({
      "best-sellers": {
        heading: t("header.bestsellers"),
      },
      "new-arrivals": {
        heading: t("header.newarrivals"),
      },
      "skin-care": {
        heading: t("collectionspage.banners.skincareheading"),
        description: t("collectionspage.banners.skincaredetail"),
        bgImage: skincarebg,
      },
      "face-mask": {
        heading: t("collectionspage.banners.facemaskheading"),
        description: t("collectionspage.banners.facemaskdetail"),
        bgImage: serumImg,
      },
      "texture-and-makeup": {
        heading: t("collectionspage.banners.textureandmakeupheading"),
        description: t("collectionspage.banners.textureandmakeupdetail"),
        bgImage: skincarebg,
      },
    }),
    [t]
  );

  const bannerProps = bannerData[path];


  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-[#fff5ee] dark:bg-gray-900">
      {bannerProps && <Banner {...bannerProps} />}
      <StickyFilter
      items={products}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      fetchMore={async () => {
        await dispatch(fetchFilteredProducts({ filters: { tags: [path] }, pageSize: pageSize }));
      }}
      sortOptions={[
          {
            key: "createdAt-desc",
            label: "Date (New to Old)",
          },
          {
            key: "createdAt-asc",
            label: "Date (Old to New)",
          },
          {
            key: "name-desc",
            label: "Alphabetically (Z-A)",
          },
          {
            key: "name-asc",
            label: "Alphabetically (A-Z)",
          },
          {
            key: "price-desc",
            label: "Price (High to Low)",
          },
          {
            key: "price-asc",
            label: "Price (Low to High)",
          }
         
        ]}
        onSortChange={async (key: string) => {
          const [field, order] = key.split("-");
          setSortKey(field);
          setSortOrder(order as "asc" | "desc");
          dispatch(resetProducts());
          setCurrentPage(1);
          await dispatch(
            fetchFilteredProducts({
              filters: { tags: [path] },
              sortField: field,
              sortOrder: order as "asc" | "desc",
              pageSize: pageSize,
            })
          );
        }}
       />
      <div className="max-w-screen-2xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-20">
          {currentPageProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          items={products}
          pageSize={pageSize}
          totalItems={totalProducts as number}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setCurrentPageItems={setCurrentPageProducts}
          fetchMore={async () => {
            await dispatch(
              fetchAllProducts({
                categoryId,
                pageSize,                
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export default CollectionPages;
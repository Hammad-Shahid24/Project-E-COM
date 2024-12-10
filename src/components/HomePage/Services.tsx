import { LifebuoyIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoReloadSharp } from "react-icons/io5";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const Services: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-[#e4ece6] dark:bg-gray-900 font-poppins dark:border-b dark:border-white">
      {/* Desktop and Tablet View */}
      <div className="max-w-screen-xl w-full hidden sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 px-4 pt-12 pb-14 mx-auto">
        {/* Left Group */}
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-5">
          <ServiceItem
            icon={
              <MdOutlineLocalShipping className="w-9 h-9 mt-1 text-teal-900 dark:text-white mx-auto" />
            }
            heading={t("homepage.services.shipping")}
            detail={t("homepage.services.shippingdetail")}
          />
          <ServiceItem
            icon={
              <LifebuoyIcon className="w-10 h-10 text-teal-900 dark:text-white mx-auto" />
            }
            heading={t("homepage.services.support")}
            detail={t("homepage.services.supportdetail")}
          />
        </div>

        {/* Right Group */}
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-5">
          <ServiceItem
            icon={
              <IoReloadSharp className="w-10 h-10 text-teal-900 dark:text-white mx-auto" />
            }
            heading={t("homepage.services.returns")}
            detail={t("homepage.services.returnsdetail")}
          />
          <ServiceItem
            icon={
              <RiShieldKeyholeLine className="w-10 h-10 text-teal-900 dark:text-white mx-auto" />
            }
            heading={t("homepage.services.payment")}
            detail={t("homepage.services.paymentdetail")}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="w-full sm:hidden pt-12 pb-14 overflow-x-auto">
        <div className="w-fit flex gap-8 px-8">
          <ServiceItem
            icon={
              <MdOutlineLocalShipping className="w-9 h-9 mt-1 text-teal-900 dark:text-white mx-auto" />
            }
            heading={t("homepage.services.shipping")}
            detail={t("homepage.services.shippingdetail")}
          />
          <ServiceItem
            icon={
              <LifebuoyIcon className="w-10 h-10 text-teal-900 dark:text-white mx-auto" />
            }
            heading={t("homepage.services.support")}
            detail={t("homepage.services.supportdetail")}
          />
          <ServiceItem
            icon={
              <IoReloadSharp className="w-10 h-10 text-teal-900 dark:text-white mx-auto" />
            }
            heading={t("homepage.services.returns")}
            detail={t("homepage.services.returnsdetail")}
          />
          <ServiceItem
            icon={
              <RiShieldKeyholeLine className="w-10 h-10 text-teal-900 dark:text-white mx-auto" />
            }
            heading={t("homepage.services.payment")}
            detail={t("homepage.services.paymentdetail")}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;

interface ServiceItemProps {
  icon: JSX.Element;
  heading: string;
  detail: string;
}

function ServiceItem({ icon, heading, detail }: ServiceItemProps) {
  return (
    <div className="flex justify-center gap-x-4 min-w-52 w-fit xl:max-w-64 ">
      {icon}
      <div className="flex flex-col items-start">
        <h2 className="text-sm font-medium text-teal-900 dark:text-white">
          {heading}
        </h2>
        <p className="text-sm text-teal-900 dark:text-gray-300 leading-loose">
          {detail}
        </p>
      </div>
    </div>
  );
}

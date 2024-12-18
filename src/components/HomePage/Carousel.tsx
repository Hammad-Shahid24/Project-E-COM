import { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../assets/carousel/carousel-1.png";
import image2 from "../../assets/carousel/carousel-2.png";
import responsiveImage1 from "../../assets/carousel/responsive-carousel-1.png";
import responsiveImage2 from "../../assets/carousel/responsive-carousel-2.png";
import "../../styles/carousel.css";

const Carousel: FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="carousel-container relative w-full max-w-screen-2xl mx-auto bg-gray-100 dark:bg-gray-900">
      <Slider {...settings}>
        {/* Slides */}
        {[
          { desktop: image1, mobile: responsiveImage1 },
          { desktop: image2, mobile: responsiveImage2 },
        ].map((image, index) => (
          <div key={index} className="slide">
            <picture>
              <source srcSet={image.mobile} media="(max-width: 640px)" />
              <img
                src={image.desktop}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto object-cover "
                loading="lazy"
              />
            </picture>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

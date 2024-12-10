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
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="carousel-container relative w-full max-w-screen-2xl mx-auto  bg-gray-100 dark:bg-gray-900">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="slide">
          <picture>
            {/* Responsive Image Handling */}
            <source
              srcSet={responsiveImage1}
              media="(max-width: 640px)" // Matches small screens
            />
            <img
              src={image1}
              alt="Slide 1"
              className="w-full h-auto object-cover bg-blue-200 "
            />
          </picture>
        </div>
        {/* Slide 2 */}
        <div className="slide">
          <picture>
            {/* Responsive Image Handling */}
            <source
              srcSet={responsiveImage2}
              media="(max-width: 640px)" // Matches small screens
            />
            <img
              src={image2}
              alt="Slide 2"
              className="w-full h-auto object-cover"
            />
          </picture>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;

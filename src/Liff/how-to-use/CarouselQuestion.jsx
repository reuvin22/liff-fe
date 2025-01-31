import React from "react";
import Slider from "react-slick";
import "./Carousel.css";

const Carousel = ({ slides }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <>
      <div className="container">
        <div className="carousel-container">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="carousel-slide">
                <h3>{slide.text}</h3>
                <img
                  className="carousel-images"
                  src={slide.image}
                  alt={slide.alt}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Carousel;
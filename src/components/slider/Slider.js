import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Slider.css";

import SliderJs from "react-slick";
import { useTheme } from "@material-ui/core";

export default function Slider({ templates }) {
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const theme = useTheme();
  return (
    <div>
      <SliderJs {...settings}>
        {templates?.map((template) => (
          <div className=" p-3" key={template._id}>
            <div
              className="card p-3 card-width"
              style={{ backgroundColor: theme.palette.background.light }}
            >
              <div className="card-block">
                <h6 className="card-title text-center pb-3">
                  {template.title}
                </h6>
                <p className=" p-y-1 " style={{ textAlign: "justify" }}>
                  {template.body.slice(0, 200)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </SliderJs>
    </div>
  );
}

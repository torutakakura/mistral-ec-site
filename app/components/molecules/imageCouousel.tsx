"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showIndicators={true}
      showThumbs={false}
      interval={3000}
    >
      <div>
        <img className="w-full" src="/images/main1.png" alt="Image 1" />
      </div>
      <div>
        <img className="w-full" src="/images/main2.png" alt="Image 2" />
      </div>
      <div>
        <img className="w-full" src="/images/main3.png" alt="Image 3" />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;

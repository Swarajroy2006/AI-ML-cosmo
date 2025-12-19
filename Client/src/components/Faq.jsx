import React from "react";
import Carousel from "../Carousel";
import Team from "./Team";

const Faq = () => {
  return (
    <>
    <Team/>
    <section className="w-full h-full bg-neutral-950 flex justify-center items-center">
      
      <div style={{ height: "800px", position: "relative" }}>
        <Carousel
          baseWidth={400}
          autoplay={true}
          autoplayDelay={5000}
          pauseOnHover={true}
          loop={true}
          height= {500}
          round={false}
        />
      </div>
      
    </section>
    <footer className="bg-white">f</footer>
    </>
  );
};

export default Faq;

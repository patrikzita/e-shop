import React from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "./CarouselItem";

const ITEMS = [
  {
    id: 1,
    title: "Catch 'Em All",
    subtitle: "Buy now",
    url: "/boxes",
    imgUrl: "pikachu.png",
    position: "right",
    bgColor: "#ededed",
  },
  {
    id: 2,
    title: "Discover the Magic of Pokémon",
    subtitle: "Start your adventure",
    url: "/cards",
    imgUrl: "charizard.png",
    position: "left",
    bgColor: "#fbd4cf",
  },
];

const CarouselProvider: React.FC = () => {
  return (
    <Carousel interval={5000} duration={800}>
      {ITEMS.map((item) => (
        <CarouselItem
          key={item.id}
          title={item.title}
          buttonTitle={item.subtitle}
          url={item.url}
          imgUrl={item.imgUrl}
          textPosition={item.position}
          bgColor={item.bgColor}
        />
      ))}
    </Carousel>
  );
};

export default CarouselProvider;

import CarouselProvider from "../components/Carousel/CarouselProvider";
import StoreList from "../components/Shop/StoreList";

const Home = () => {
  return (
    <>
      <CarouselProvider />
      <StoreList title={"News & Promotions"} sortItem="promotion" />
    </>
  );
};

export default Home;

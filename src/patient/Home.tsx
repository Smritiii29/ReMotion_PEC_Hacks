import Header from "../components/Header"; // Adjust paths based on your folder structure
import StatsSection from "../components/StatsSection";
import ExerciseCarousel from "../components/ExerciseCarousel";

const Home = () => {
  return (
    <div className=" space-y-8 w-full ">
      {/* 1. The Header */}
      <Header />
    {/* 3. The Exercise Carousel */}
      
        <ExerciseCarousel />
      
      {/* 2. The Stats Section */}
      <StatsSection />

      
    </div>
  );
};

export default Home;
import Hero from "../../../components/user/home/Hero";
import Navbar from "../../../components/user/navbar/Navbar";
import Service from "./service/Service";
import Facilities from "../../../components/user/home/Facilities";
import Footer from "../../../components/user/footer/Footer";

const Home = () => {
  return (
    <div className="w-full min-h-screen text-white">
      <Navbar />
      {/* <Hero /> */}
      <Service/>
      <Facilities/>
      <Footer/>
    </div>
  );
};

export default Home;

import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import RecommendImg from "../assets/3.jpg";
import Footer from "../Components/Footer";
import Recommendation from "../Components/Recommendation";

function Recommend (){
    return(
    <>
        <Navbar />
        <Hero 
        cName="hero-mid" 
        heroImg={RecommendImg}
        title="Recommend"
        btnClass="hide" 
        />
        <Recommendation />

       <Footer />
     </>
    );
}
export default Recommend;
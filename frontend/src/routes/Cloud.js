import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Wordcloud from "../Components/Wordcloud";
import AboutUs from "../Components/AboutUs";
import CloudImg from "../assets/5.jpg";
function Cloud (){
    return(
    <>
       <Navbar />
       <Hero 
       cName="hero-mid" 
       heroImg={CloudImg}
       title="Word Cloud"
       btnClass="hide" 
       />
       <Wordcloud />
       <AboutUs />
       <Footer />
       
    </>
    );
}
export default Cloud;
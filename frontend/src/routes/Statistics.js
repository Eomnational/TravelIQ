import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import StatisticsImg from "../assets/4.jpg";
import Footer from "../Components/Footer";
import BookmarkTabs from "../Components/BookmarkTabs";

function Statistics (){
    return(
    <>
       <Navbar />
       <Hero 
       cName="hero-mid" 
       heroImg={StatisticsImg}
       title="Statistics"
       btnClass="hide" 
       />
       <BookmarkTabs />

       <Footer />
    </>
    );
}
export default Statistics;
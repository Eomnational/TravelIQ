
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import CommentImg from "../assets/2.jpg";

import TravelInfoTable from "../Components/TravelInfoTable";

function Comment (){
    return(
    <>
       <Navbar />
       <Hero 
       cName="hero-mid" 
       heroImg={CommentImg}
       title="Comment"
       btnClass="hide" 
       />
       <TravelInfoTable />
       <Footer />
    </>
    );
}
export default Comment;
import React, { Suspense } from 'react';
// 使用 React.lazy 懒加载组件
const Navbar = React.lazy(() => import("../Components/Navbar"));
const Destination = React.lazy(() => import("../Components/Destination"));
const Trip = React.lazy(() => import("../Components/Trip"));
const Footer = React.lazy(() => import("../Components/Footer"));
const Hero = React.lazy(() => import("../Components/Hero"));
const ChinaMapShow = React.lazy(() => import("../Components/ChinaMapShow"));
const ThreeCards = React.lazy(() => import("../Components/ThreeCards"));
const TopTenTable = React.lazy(() => import("../Components/TopTenTable"));
const TopRanking = React.lazy(() => import("../Components/TopRanking"));

function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        {/* <Video 
          cName="video"
          src="https://nie.v.netease.com/nie/2024/0913/f240e7d571090f3476b6b94886586afd.mp4"
          title="Your Journey Your Story"
          text="Choose Your Favourite Destination" 
          buttonText="Travel Plan"
          url="/"
          btnClass="show"
        /> */}
        
       <Hero 
       cName="hero-mid" 
       heroImg="https://images.unsplash.com/photo-1728650388218-c10708026ad3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       title="Home"
       btnClass="hide" 
       />
        <ThreeCards />
        <ChinaMapShow />
        <TopRanking />
        <TopTenTable />
        <Destination />
        <Trip />
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;


import DestinationData from "./DestinationData";
import "../CSS/DestinationStyles.css";
import Mountain1 from "../assets/2.jpg";
import Mountain2 from "../assets/2.jpg";
import Mountain3 from "../assets/5.jpg";
import Mountain4 from "../assets/8.jpg";

const Destination = () => {
  return (
    <div className="destination">
      <h1>热门景点</h1>
      <p>Tours give you the opportunity to see alot within a time frame</p>
      
      <DestinationData
        className="first-des"
        heading="张家界国家森林公园"
        text="张家界国家森林公园是中国首个国家森林公园，以奇峰异石和浓密的植被著称。这里有千姿百态的石柱、山峰，仿佛悬浮于云雾之间。著名的景点包括："
        str1="袁家界"
        text1="：这是《阿凡达》电影中“哈利路亚山”的灵感来源地，景区内的山峰高耸入云，给人以科幻世界般的视觉享受。"
        str2="金鞭溪"
        text2="：被誉为“最美的峡谷”，这里溪水清澈见底，沿途山峰奇特，像是天然的画廊，适合徒步旅行。"
        str3="黄石寨"
        text3="：这是张家界最早开放的观景点之一，可以鸟瞰整个张家界的奇峰美景。"
        img1={Mountain1}
         />

      <DestinationData
       className="first-des-reverse"
       heading="凤凰古城"
       text="凤凰古城位于中国湖南省湘西土家族苗族自治州，是一座历史悠久的古城，以其独特的苗族、土家族文化和保存完好的明清时期建筑而闻名。凤凰古城依山傍水，风景如画，被称为中国最美丽的小城之一。以下是凤凰古城的主要景点和文化特色介绍："
       str1="虹桥风雨楼"
       text1="：虹桥是凤凰古城的标志性建筑之一，建于清朝时期，横跨在沱江之上。桥上设有风雨楼，古色古香，供行人避雨或休息。站在虹桥上，可以俯瞰整个古城和沱江两岸的美景，尤其是早晚时分，景色尤为迷人。"
       str2="沱江"
       text2="：沱江是古城的母亲河，贯穿整个古城，河水清澈见底，两岸是古老的吊脚楼建筑。游客可以选择乘坐乌篷船沿江游览，感受两岸风光，欣赏吊脚楼的独特魅力。晚上，沱江两岸灯火通明，映照在河面上，美轮美奂。"
       str3="万寿宫"
       text3="：万寿宫是古城内保存完好的道教宫庙，建于明朝。宫庙建筑精美，殿内供奉着道教的神祇，反映了古城浓厚的宗教文化氛围。每年当地居民会在此举行道教仪式，祈求风调雨顺、五谷丰登。"
        img1={Mountain3}
         />
    </div>
  );
};

export default Destination;
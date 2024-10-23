import WordcloudData from "./WordcloudData";
import "../CSS/WordcloudStyles.css";
import Mountain1 from "../assets/introCloud.jpg";
import Mountain2 from "../assets/commentContentCloud.jpg";
const Wordcloud = () => {
    return (
      <div className="WordCloud">
        <h1>词云图</h1>
        <p>Word Cloud</p>
        
        <WordcloudData
          className="first-woc"
          heading="详情简介词云图"
          text="以旅游评论内容为基础，
          展示了游客对旅游体验的关键词汇。图中“导游”、
          “我们”、“很好”、“去”、“可以”等词频较大，表明导游的表现、
          游客的参与感以及旅行体验的整体评价是评论的核心内容。比如“很好”、
          “去”和“导游”这些词显示出游客对导游的积极评价，强调了导游在旅游过程中的重要性。
          此外，“讲解”、“景区”*等词也显示出游客对导游讲解内容以及景区体验的关注。总体而言，词云图表明游客对旅游导游和景区的满意度较高，可能关注的是导游服务质量、
          景区设施等相关因素。" 
          img1={Mountain1}
          
           />
  
        <WordcloudData
         className="first-woc-reverse"
          heading="评论内容词云图"
          text="聚焦于旅游景区简介中的关键词汇，突出展示了与景区相关的核心信息。图中“温泉”、“景区”、“项目”、“旅游”、“一体化”等词汇占据了显著位置，
          说明该景区可能以温泉为主打项目，吸引游客前来。“休闲”、“生态”等词的出现反映了景区的特色可能与自然风光、生态环境和休闲娱乐密切相关。此外，
          “世界”、“特色”等词暗示该景区可能具有独特的地理或文化特色，
          甚至可能是一个具有世界知名度的旅游目的地。这些关键词表明，景区介绍内容侧重于突出其自然资源、生态保护和休闲娱乐功能。" 
           img1={Mountain2}
           />
      </div>
    );
  };
  
  export default Wordcloud;
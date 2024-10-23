import "../CSS/TripStyles.css";
import TripData from "./TripData";
import Trip1 from "../assets/MountWugong.jpg";
import Trip2 from "../assets/MountSanqing.jpg";
import Trip3 from "../assets/JiuzhaigouValley.jpg";

function Trip() {
  return (
    <div className="trip">
      <h1>近期行程</h1>
      <p>You can discover unique destinations using Google Maps.</p>
      <div className="tripcard">
        <TripData
          image={Trip1}
          heading="武功山"
          text="武功山位于江西省萍乡市，素有“华东户外天堂”之称，以其广袤的高山草甸、巍峨的群峰和壮丽的云海著称。山间气候多变，时常云雾缭绕，
          宛如仙境。武功山是徒步、露营爱好者的热门目的地，拥有独特的自然景观和丰富的植被，最高峰金顶海拔1918.3米，登顶后可俯瞰整个山脉。武功山
          还以其丰富的历史文化和佛教遗迹吸引众多游客，是探险与修身的理想之地。"
           />

        <TripData
          image={Trip2}
          heading="三清山"
          text="三清山位于江西省上饶市，以其奇特的花岗岩山峰、清澈的溪流和丰富的道教文化闻名。山中主要有三座主峰，分别是玉京峰、石柱峰和天门峰，形状各异，宛如仙境。三清山被誉为“华东的黄山”，以云海、奇石和古松著称，是理想的徒步和摄影胜地。山中还有许多道教寺庙，提供了独特的文化体验，吸引了大量游客和信徒。" 
           />

        <TripData
          image={Trip3}
          heading="九寨沟"
          text="九寨沟位于中国四川省阿坝藏族羌族自治州，是世界自然遗产，以其梦幻般的彩色湖泊、瀑布、雪山和原始森林著称。景区内的五花海、长海、诺日朗瀑布等景点因湖水的多彩变化和周围的自然美景吸引着无数游客。九寨沟四季景色各异，秋季尤为壮丽，五彩斑斓的山水交相辉映。这里还是藏族和羌族的聚居地，融合了浓厚的民族风情和自然奇观，被誉为“人间仙境”"
           />
      </div>
    </div>
  );
}

export default Trip;
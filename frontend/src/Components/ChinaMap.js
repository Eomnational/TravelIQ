import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import chinaGeoJson from './China.json';
import { useData } from './DataContext';

const ChinaMap = () => {
  const { geoData } = useData();
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    echarts.registerMap('china', chinaGeoJson);
    if (geoData.length > 0) {
      setMapReady(true);
    }
  }, [geoData]);

  if (!mapReady) {
    return <div>Loading map...</div>; // 显示加载状态
  }

  const option = {
    tooltip: {
      triggerOn: 'mousemove',
      formatter: function (e) {
        const data = e.data;
        return data ? `城市：${data.name}\t景点数：${data.value}` : '暂未拥有数据';
      },
    },
    visualMap: {
      show: true,
      pieces: [
        { gte: 300, label: '>= 300', color: '#ff7979' },
        { gte: 150, lt: 300, label: '150 - 300', color: '#badc58' },
        { gte: 100, lt: 150, label: '100 - 150', color: '#ffbe76' },
        { gte: 50, lt: 100, label: '50 - 100', color: '#f6e58d' },
        { gte: 10, lt: 50, label: '10 - 50', color: '#7ed6df' },
        { lt: 10, label: '<10', color: 'orange' },
      ],
    },
    geo: {
      map: 'china',
      roam: true,
      label: {
        show: true,
        color: '#fff',
      },
      itemStyle: {
        areaColor: '#008c8c',
        borderColor: 'rgba(0, 0, 0, 0.4)',
      },
    },
    series: [
      {
        name: '成果预览',
        type: 'map',
        geoIndex: 0,
        data: geoData.map((item) => ({
          name: item.name,
          value: item.value,
        })),
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: '600px', width: '100%' }} />;
};

export default ChinaMap;

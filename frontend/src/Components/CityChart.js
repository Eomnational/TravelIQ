import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material'; 

// 使用 React.lazy 懒加载 ECharts 组件
const LazyECharts = React.lazy(() => import('echarts-for-react'));

const CityChart = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCityData = async () => {
            const cachedData = localStorage.getItem('cityCharData');
            if (cachedData) {
                setData(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/city-char/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setData(response.data);
                localStorage.setItem('cityCharData', JSON.stringify(response.data)); // 缓存数据
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCityData();
    }, []);

    const barChartOptions = data ? {
        tooltip: { trigger: 'axis' },
        legend: { data: ['各城市景点个数'] },
        toolbox: {
            show: true,
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        xAxis: [
            {
                type: 'category',
                data: data.cityCharOneData.Xdata,
            },
        ],
        yAxis: [{ type: 'value' }],
        series: [
            {
                name: '各城市景点个数',
                type: 'bar',
                data: data.cityCharOneData.Ydata,
                markPoint: {
                    data: [{ type: 'max', name: 'Max' }, { type: 'min', name: 'Min' }],
                },
                markLine: { data: [{ type: 'average', name: 'Avg' }] },
            },
        ],
    } : null;

    const pieChartOptions = data ? {
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        series: [
            {
                name: '景点等级占比',
                type: 'pie',
                radius: ['40%', '70%'],
                data: data.cityCharTwoData,
            },
        ],
    } : null;

    if (loading) {
        return (
            <div>
                <CircularProgress /> {/* 使用 MUI 的加载指示器 */}
                <p>加载中...</p>
            </div>
        );
    }
    if (error) return <div>出错了: {error.message}</div>;

    return (
        <div>
            <h3>城市图表</h3>
            <div id="mains">
                <Suspense fallback={<div>加载图表...</div>}>
                    <LazyECharts option={barChartOptions} />
                </Suspense>
            </div>
            <div id="mainsTwo" style={{ marginTop: '20px' }}>
                <Suspense fallback={<div>加载图表...</div>}>
                    <LazyECharts option={pieChartOptions} />
                </Suspense>
            </div>
        </div>
    );
};

export default CityChart;




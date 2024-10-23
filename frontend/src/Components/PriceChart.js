import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

// 使用 React.lazy 懒加载 ECharts 组件
const LazyECharts = React.lazy(() => import('echarts-for-react'));

// Memoized Chart Component
const MemoizedECharts = React.memo(({ option }) => (
    <LazyECharts option={option} />
));

const PriceChart = () => {
    const [data, setData] = useState(null); // 存储 API 获取的数据
    const [loading, setLoading] = useState(true); // 加载状态
    const [error, setError] = useState(null); // 错误状态

    // 使用 useEffect 发送 API 请求
    useEffect(() => {
        const fetchPriceData = async () => {
            const cachedData = localStorage.getItem('priceCharData'); // 检查缓存
            if (cachedData) {
                setData(JSON.parse(cachedData)); // 使用缓存数据
                setLoading(false); // 设置加载完成
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/price-char/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // 只在数据变化时更新状态
                if (JSON.stringify(response.data) !== JSON.stringify(data)) {
                    setData(response.data); // 将返回的数据存储到 state 中
                    localStorage.setItem('priceCharData', JSON.stringify(response.data)); // 缓存数据
                }
                setLoading(false); // 加载完成
            } catch (err) {
                setError(err); // 处理错误
                setLoading(false); // 加载完成（出错）
            }
        };

        fetchPriceData(); // 调用函数
    }, []); // 仅在首次加载时获取数据

    // 加载状态
    if (loading) {
        return (
            <div>
                <CircularProgress /> {/* 使用 MUI 的加载指示器 */}
                <p>加载中...</p>
            </div>
        );
    }

    // 错误状态
    if (error) {
        return <div>出错了: {error.message}</div>;
    }

    // 价格趋势图的配置项
    const priceTrendOptions = {
        title: {
            text: '景点价格趋势分析'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {},
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.echartsData.xData // 从 API 获取的 X 轴数据
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} 个'
            },
            axisPointer: {
                snap: true
            }
        },
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [
                { lte: 0, color: 'green' },
                { gt: 0, lte: 1, color: 'red' },
                { gt: 1, lte: 4, color: 'green' },
                { gt: 4, lte: 5, color: 'red' },
                { gt: 5, color: 'green' }
            ]
        },
        series: [
            {
                name: '价格区间个数',
                type: 'line',
                smooth: true,
                data: data.echartsData.yData, // 从 API 获取的 Y 轴数据
                markArea: {
                    itemStyle: {
                        color: 'rgba(255, 173, 177, 0.4)'
                    },
                    data: [
                        [
                            { name: '起伏趋势较高', xAxis: '免费' },
                            { xAxis: '100元以内' }
                        ],
                        [
                            { name: '较为平缓', xAxis: '400元以内' },
                            { xAxis: '500元以内' }
                        ]
                    ]
                }
            }
        ],
        animation: false // 禁用动画以提高性能
    };

    // 销量柱状图的配置项
    const salesBarOptions = {
        xAxis: {
            type: 'category',
            data: data.echartsData.x1Data // 从 API 获取的 X 轴数据
        },
        yAxis: {
            type: 'value',
            name: '销量个数',
        },
        series: [{
            name: '销量个数',
            type: 'bar',
            data: data.echartsData.y1Data, // 从 API 获取的 Y 轴数据
            itemStyle: {
                color: '#2f4554',
                emphasis: {
                    color: '#c23531',
                }
            },
            label: {
                show: true,
                position: 'top',
            }
        }],
        dataZoom: [
            {
                show: true,
                start: 0,
                end: 20
            }
        ],
        animationEasing: 'elasticOut',
        animationDelay: (idx) => idx * 100,
    };

    // 折扣饼图的配置项
    const discountPieOptions = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            type: 'scroll',
        },
        series: [
            {
                name: '折扣占比个数',
                type: 'pie',
                radius: '50%',
                data: data.echartsData.disCountPieData, // 从 API 获取的饼图数据
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return (
        <div>
            <h3>价格图表</h3>
            <div id="mains">
                {/* 渲染价格趋势图 */}
                <Suspense fallback={<div>加载价格趋势图...</div>}>
                    <MemoizedECharts option={priceTrendOptions} />
                </Suspense>
            </div>
            <div id="mainsTwo" style={{ marginTop: '20px' }}>
                {/* 渲染销量柱状图 */}
                <Suspense fallback={<div>加载销量柱状图...</div>}>
                    <MemoizedECharts option={salesBarOptions} />
                </Suspense>
            </div>
            <div id="mainsThree" style={{ marginTop: '20px' }}>
                {/* 渲染折扣饼图 */}
                <Suspense fallback={<div>加载折扣饼图...</div>}>
                    <MemoizedECharts option={discountPieOptions} />
                </Suspense>
            </div>
        </div>
    );
};

export default PriceChart;



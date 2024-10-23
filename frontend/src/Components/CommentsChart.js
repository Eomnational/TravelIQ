import React, { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material'; // 需要安装 @mui/material

const ReactECharts = lazy(() => import('echarts-for-react'));

const CommentsChart = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommentsData = async () => {
            const cachedData = localStorage.getItem('commentsData');
            if (cachedData) {
                setData(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/comments-char/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // 缓存数据
                localStorage.setItem('commentsData', JSON.stringify(response.data));
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCommentsData();
    }, []);

    if (loading) {
        return (
            <div>
                <CircularProgress /> {/* 使用 MUI 的加载指示器 */}
                <p>加载中...</p>
            </div>
        );
    }

    if (error) {
        return <div>出错了: {error.message}</div>;
    }

    // 将 echarts 导入放到这里
    const echarts = require('echarts'); // 将 echarts 导入放在这里

    // 图表配置项
    const lineChartOptions = {
        title: {
            text: '评论时间个数折线图',
            left: '1%'
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '5%',
            right: '15%',
            bottom: '10%'
        },
        xAxis: {
            data: data.echartsData.xData // 从 API 获取的 X 轴数据
        },
        yAxis: {},
        toolbox: {
            right: 10,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [
            {
                startValue: '2022-08-25'
            },
            {
                type: 'inside'
            }
        ],
        visualMap: {
            top: 50,
            right: 10,
            pieces: [
                { gt: 0, lte: 2, color: '#93CE07' },
                { gt: 2, lte: 4, color: '#FBDB0F' },
                { gt: 4, lte: 6, color: '#FC7D02' },
                { gt: 6, lte: 10, color: '#FD0100' },
                { gt: 10, lte: 20, color: '#AA069F' }
            ],
            outOfRange: {
                color: '#999'
            }
        },
        series: {
            name: '个数',
            type: 'line',
            data: data.echartsData.yData, // 从 API 获取的 Y 轴数据
            markLine: {
                silent: true,
                lineStyle: {
                    color: '#333'
                },
                data: [
                    { yAxis: 50 },
                    { yAxis: 100 },
                    { yAxis: 150 },
                    { yAxis: 200 },
                    { yAxis: 300 }
                ]
            }
        }
    };

    const pieChartOptions = {
        title: {
            text: '评论等级个数',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '评论等级',
                type: 'pie',
                radius: '50%',
                data: data.echartsData.commentsScorePieData, // 从 API 获取的饼图数据
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

    const barChartOptions = {
        title: {
            text: '各景点评论总量区间分析图',
            left: 'center'
        },
        xAxis: {
            data: data.echartsData.x1Data, // 从 API 获取的 X 轴数据
            axisLabel: {
                inside: true,
                color: '#fff'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999'
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                data: data.echartsData.y1Data // 从 API 获取的 Y 轴数据
            }
        ]
    };

    return (
        <div>
            <h3>评论图表</h3>
            <Suspense fallback={<CircularProgress />}>
                <div id="mains">
                    <ReactECharts option={lineChartOptions} />
                </div>
                <div id="mainsTwo">
                    <ReactECharts option={pieChartOptions} />
                </div>
                <div id="mainsThree">
                    <ReactECharts option={barChartOptions} />
                </div>
            </Suspense>
        </div>
    );
};

export default CommentsChart;






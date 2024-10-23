import React, { useState, Suspense, lazy, useCallback } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { throttle } from 'lodash';

// 懒加载图表组件
const CityChart = lazy(() => import('./CityChart'));
const RateChart = lazy(() => import('./RateChart'));
const PriceChart = lazy(() => import('./PriceChart'));
const CommentsChart = lazy(() => import('./CommentsChart'));

const BookmarkTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    // 节流的标签切换处理函数，防止频繁切换
    const handleTabChange = useCallback(
        throttle((event, newValue) => {
            setActiveTab(newValue);
        }, 300), // 300 毫秒节流
        []
    );

    return (
        <div className="destination">
            <h1>图表一览</h1>
            <p>Discover the world, where every destination tells a story!</p>
            
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Tabs 
                    value={activeTab} 
                    onChange={handleTabChange} 
                    aria-label="图表书签"
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="城市图表" />
                    <Tab label="评分图表" />
                    <Tab label="价格图表" />
                    <Tab label="评论图表" />
                </Tabs>

                {/* 根据 activeTab 渲染对应的图表 */}
                <Suspense fallback={<div>加载中...</div>}>
                    {activeTab === 0 && <CityChart />}
                    {activeTab === 1 && <RateChart />}
                    {activeTab === 2 && <PriceChart />}
                    {activeTab === 3 && <CommentsChart />}
                </Suspense>
            </Box>
        </div>
    );
};

export default BookmarkTabs;


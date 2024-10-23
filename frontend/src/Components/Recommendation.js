import React, { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import { CircularProgress, Box } from '@mui/material';

const TripData = lazy(() => import('./TripData'));

const Recommendation = () => {
    const [resultDataList, setResultDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 检查 sessionStorage 中是否有已缓存的数据
        const cachedData = sessionStorage.getItem('resultDataList');
        if (cachedData) {
            // 如果有缓存数据，直接使用
            setResultDataList(JSON.parse(cachedData));
            setLoading(false);
        } else {
            // 如果没有缓存数据，执行数据请求
            fetchRecommendationData();
        }
    }, []);

    const fetchRecommendationData = () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`http://localhost:8000/api/recommendation/`)
            .then(response => {
                const data = response.data.resultDataList;
                setResultDataList(data);

                // 将数据存储到 sessionStorage 中
                sessionStorage.setItem('resultDataList', JSON.stringify(data));
            })
            .catch(error => {
                console.error("获取推荐数据时出错！", error);
                setError("获取推荐数据时出错，请稍后再试。");
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            console.error("未找到Token，用户未认证。");
            setError("未找到认证令牌，请登录后重试。");
            setLoading(false);
        }
    };

    return (
        <section className="section dashboard">
            <div className="destination">
                <h1>推荐景点</h1>
                <p>Journey to places where dreams come alive!</p>
            </div>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <div>
                        <CircularProgress />
                        <p>加载中...</p>
                    </div>
                </Box>
            ) : (
                <div className="tripcard">
                    {error ? (
                        <p>{error}</p>
                    ) : resultDataList.length > 0 ? (
                        <Suspense fallback={<CircularProgress />}>
                            {resultDataList.map((item, index) => (
                                <div className="tripcard-item" key={index}>
                                    <TripData 
                                        image={item.cover} 
                                        heading={item.title} 
                                        text={`评分：${item.score}分\n等级：${item.level}\n价格：¥${item.price}元\n详情地址：${item.detailAddress}`} 
                                    />
                                </div>
                            ))}
                        </Suspense>
                    ) : (
                        <p>没有找到推荐的景点。</p>
                    )}
                </div>
            )}
        </section>
    );
};

export default Recommendation;
















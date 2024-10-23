import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';

const RateChart = () => {
    const [cityList, setCityList] = useState([]);
    const [charOneData, setCharOneData] = useState([]);
    const [charTwoData, setCharTwoData] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 首先检查缓存
                const cachedData = JSON.parse(localStorage.getItem('rateChartData'));
                if (cachedData) {
                    setCityList(cachedData.cityList);
                    setCharOneData(cachedData.charOneData);
                    setCharTwoData(cachedData.charTwoData);
                    setSelectedCity(cachedData.cityList[0]);
                } else {
                    // 如果没有缓存，调用 API
                    const response = await axios.get('http://localhost:8000/api/rate-char/', {
                        headers: {
                            // Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    setCityList(response.data.cityList);
                    setCharOneData(response.data.charOneData);
                    setCharTwoData(response.data.charTwoData);
                    setSelectedCity(response.data.cityList[0]);

                    // 将数据存入缓存
                    localStorage.setItem('rateChartData', JSON.stringify(response.data));
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCitySelect = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/rate-char/', { province: selectedCity }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCharOneData(response.data.charOneData);
            setCharTwoData(response.data.charTwoData);

            // 更新缓存
            const cachedData = JSON.parse(localStorage.getItem('rateChartData')) || {};
            cachedData.charOneData = response.data.charOneData;
            cachedData.charTwoData = response.data.charTwoData;
            localStorage.setItem('rateChartData', JSON.stringify(cachedData));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getTreemapOptions = useMemo(() => ({
        tooltip: { trigger: 'item' },
        series: [{
            type: 'treemap',
            id: 'echarts-package-size',
            animationDurationUpdate: 1000,
            roam: false,
            nodeClick: undefined,
            data: charOneData,
            universalTransition: true,
            label: { show: true },
            breadcrumb: { show: false },
        }],
    }), [charOneData]);

    const getPieOptions = useMemo(() => ({
        title: {
            text: '景点评分占比',
            textStyle: { color: '#235894' },
        },
        tooltip: {},
        series: [{
            name: '评分个数',
            type: 'pie',
            selectedMode: 'single',
            selectedOffset: 30,
            clockwise: true,
            label: {
                fontSize: 18,
                color: '#235894',
            },
            labelLine: {
                lineStyle: {
                    color: '#235894',
                },
            },
            data: charTwoData,
            itemStyle: {
                opacity: 0.7,
                borderWidth: 3,
                borderColor: '#235894',
            },
        }],
    }), [charTwoData]);

    if (loading) {
        return <div className="spinner-border" role="status"><span className="visually-hidden">加载中...</span></div>;
    }

    if (error) {
        return <div>出错了: {error.message}</div>;
    }

    return (
        <section className="section dashboard">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">城市选择</h5>
                            <form onSubmit={handleCitySelect}>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">城市</label>
                                    <div className="col-sm-10">
                                        <select
                                            className="form-select"
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.target.value)}
                                            aria-label="Default select example"
                                        >
                                            {cityList.map((city, index) => (
                                                <option key={index} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                        <button type="submit" style={{ marginTop: '10px' }} className="btn btn-primary">
                                            提交
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">景点星级占比</h5>
                            <ReactECharts option={getTreemapOptions} style={{ height: '450px', width: '100%' }} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">景点评分占比</h5>
                            <ReactECharts option={getPieOptions} style={{ height: '450px', width: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RateChart;
























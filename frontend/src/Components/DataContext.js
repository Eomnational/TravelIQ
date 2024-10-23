// src/Components/DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// 创建一个 Context
const DataContext = createContext();

// 定义一个用于访问数据的自定义 Hook
export const useData = () => {
  return useContext(DataContext);
};

// 创建一个数据提供者组件
export const DataProvider = ({ children }) => {
  const [geoData, setGeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/home/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setGeoData(result.geoData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching geoData:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoData();
  }, []);

  return (
    <DataContext.Provider value={{ geoData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

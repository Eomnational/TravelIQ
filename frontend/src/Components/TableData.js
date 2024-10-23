import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TableData = () => {
  const { id } = useParams();  // 从 URL 中获取 id 参数
  const [tableData, setTableData] = useState(null);



  if (!tableData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Travel Info for ID: {id}</h2>
    
      <p><strong>Title:</strong> {tableData.title}</p>

      <p><strong>Details:</strong> {tableData.details}</p>

      {/* 你可以根据需要展示更多内容 */}
    </div>
  );
};

export default TableData;

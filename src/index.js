import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18의 새로운 API 사용
import './index.css'; // CSS 파일 import
import AppWrapper from './App'; // AppWrapper import
import reportWebVitals from './reportWebVitals'; // 성능 측정을 위한 설정

const root = ReactDOM.createRoot(document.getElementById('root')); // 'root' 요소 선택
root.render(
    <React.StrictMode>
        <AppWrapper /> {/* AppWrapper를 렌더링하여 페이지 간 이동을 가능하게 합니다. */}
    </React.StrictMode>
);

// 성능 측정을 위한 설정
reportWebVitals();

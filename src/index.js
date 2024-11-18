import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // App 컴포넌트를 가져옵니다.
import reportWebVitals from './reportWebVitals';

// ReactDOM을 통해 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* App 컴포넌트를 렌더링하여 페이지 간 이동을 가능하게 합니다. */}
  </React.StrictMode>
);

// 성능 측정을 위한 설정
reportWebVitals();

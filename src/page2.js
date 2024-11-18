import React from 'react';
import './Home.css';

function Page2({ goToPage }) {
    return (
        <div className="container">
            <h1>자신이 가장 좋아하는 사진 또는 추억을 떠올려봅니다</h1>
            <button onClick={() => goToPage('home')}>돌아가기</button>
            <br />
            <button onClick={() => goToPage('page3')} className="triangle-button">▲</button>
        </div>
    );
}

export default Page2;

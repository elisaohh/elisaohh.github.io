import React from 'react';
import './Page.css';

function Page2({ goToPage }) {
    return (
        <div className="container">
            <div className='p2-text'>자신이 가장 좋아하는 사진</div>
            <div className='p2-text'>또는 추억을 떠올려봅니다</div>
            <div className="triangle-button" onClick={() => goToPage('page3')} />
        </div>
    );
}

export default Page2;

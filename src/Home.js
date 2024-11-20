import React from 'react';
import './Page.css';

function Home({ goToPage }) {
    return (
        <div className="container">
            <h1>추억의 조각,</h1>
            <div className='title'>영수증으로 남기는 나의 이야기</div>
            <div className="triangle-button" onClick={() => goToPage('page2')} />
        </div>
    );
}

export default Home;

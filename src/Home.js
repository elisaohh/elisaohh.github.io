import React from 'react';
import './Home.css';

function Home({ goToPage }) {
    return (
        <div className="container">
            <h1>나만의 영수증 만들기</h1>
            <div className="triangle-button" onClick={() => goToPage('page2')} />
        </div>
    );
}

export default Home;

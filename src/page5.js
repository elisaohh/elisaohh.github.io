import React, { useState } from 'react';
import './Home.css';

function Page5({ goToPage, setReceiptName }) {
    const [name, setName] = useState('');
    const [count, setCount] = useState(1000); // 기본값 1000부터 시작

    const handleSubmit = () => {
        const finalName = name.trim() === '' ? `User${count}` : name;
        console.log("Name submitted:", finalName); // 디버깅용 로그
        setReceiptName(finalName); // 입력한 이름을 상태로 설정
        goToPage('receipt'); // 영수증 페이지로 이동

        // count 증가
        if (name.trim() === '') {
            setCount(prevCount => prevCount + 1);
        }
    };

    return (
        <div className="container">
            <h1>본인의 이름 또는 닉네임을 적어주세요!</h1>
            <input
                type="text"
                className="name-input"
                placeholder="이름 또는 닉네임"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleSubmit}>완료</button>
        </div>
    );
}

export default Page5;

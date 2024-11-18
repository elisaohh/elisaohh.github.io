import React, { useState } from 'react';
import './Home.css';

function Page5({ goToPage, setReceiptName }) {
    const [name, setName] = useState('');
    const [count, setCount] = useState(1000); // 기본값 1000부터 시작

    const handleSubmit = () => {
        const finalName = name.trim() === '' ? `User${count}` : name;
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
            <p className="small-text">원하시지 않으시면 그냥 넘어가도 괜찮습니다 :)</p>

            <input
                type="text"
                className="name-input"
                placeholder="이름 또는 닉네임"
                value={name}
                onChange={(e) => setName(e.target.value)} // 입력값 상태 업데이트
            />

            <button 
                className="triangle-button" 
                onClick={handleSubmit} // 입력 완료 후 영수증 페이지로 이동
                style={{ position: 'absolute', bottom: '20px', right: '20px' }} // 오른쪽 하단에 위치 조정
            >
                완료
            </button>
        </div>
    );
}

export default Page5;

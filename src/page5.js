import React, { useState } from 'react';

function Page5({ goToPage, setReceiptName, receiptItems, receiptDate }) {
    const [name, setName] = useState(''); // 이름 상태
    const [count, setCount] = useState(1000); // 기본값 1000부터 시작

    const handleSubmit = () => {
        const finalName = name.trim() === '' ? `User${count}` : name; // 이름이 비어있다면 'User{count}'로 설정

        const itemsData = encodeURIComponent(JSON.stringify(receiptItems));
        const dateData = encodeURIComponent(receiptDate);
        const nameData = encodeURIComponent(finalName);

        // 영수증 페이지로 이동
        goToPage(`receipt?items=${itemsData}&name=${nameData}&date=${dateData}`);

        // count 증가
        if (name.trim() === '') {
            setCount(prevCount => prevCount + 1); // 이름이 비어있을 때 count 증가
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

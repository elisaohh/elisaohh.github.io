import React, { useState } from 'react';

function Page3({ goToPage, setReceiptItems }) {
    const [items, setItems] = useState([{ name: '', price: '' }]);
    const [name, setName] = useState(''); // 이름 상태 추가
    const [date, setDate] = useState(''); // 날짜 상태 추가

    const handleChange = (index, event) => {
        const newItems = [...items];
        newItems[index][event.target.name] = event.target.value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { name: '', price: '' }]);
    };

    const handleSubmit = () => {
        setReceiptItems(items); // 입력된 상품 정보를 상태로 설정
        const itemsData = encodeURIComponent(JSON.stringify(items)); // JSON 문자열로 변환 후 URL 인코딩
        goToPage(`receipt?items=${itemsData}&name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}`); // 페이지 4로 이동
    };

    return (
        <div className="container">
            <h1>어떤 점들이 추억을 소중하게 만드나요?</h1>
            <div className="input-container">
                {items.map((item, index) => (
                    <div className="input-row" key={index}>
                        <input
                            type="text"
                            name="name"
                            placeholder="상품명"
                            value={item.name}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="가격"
                            value={item.price}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)} // 이름 입력 처리
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)} // 날짜 입력 처리
            />
            <button onClick={addItem}>상품 추가</button>
            <button onClick={handleSubmit}>다음</button>
        </div>
    );
}

export default Page3;

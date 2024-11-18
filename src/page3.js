import React, { useState } from 'react';

function Page3({ goToPage, setReceiptItems }) {
    const [items, setItems] = useState([{ name: '', price: '' }]);

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
        goToPage('page4'); // Page4로 이동
    };

    return (
        <div className="container">
            <h1>어떤 점들이 추억을 소중하게 만드나요?</h1>
            <p className="small-text">(사랑하는 사람, 선선하게 부는 바람, 좋아하는 노래 제목 등 다양하게 적어주세요!)</p>
            <p className="small-text">(각 목록이 소중한 추억에서 차지하는 정도를 함께 적어주세요!)</p>

            <div className="input-container">
                {items.map((item, index) => (
                    <div className="input-row" key={index}>
                        <input
                            type="text"
                            name="name"
                            className="left-input"
                            placeholder="상품명"
                            value={item.name}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <input
                            type="number"
                            name="price"
                            className="right-input"
                            placeholder="가격"
                            value={item.price}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>
                ))}
            </div>

            <button onClick={addItem}>상품 추가</button>
            <button 
                className="triangle-button" 
                onClick={handleSubmit} // 입력 완료 후 Page4로 이동
                style={{ position: 'absolute', bottom: '20px', right: '20px' }} // 오른쪽 하단에 위치 조정
            >
                다음
            </button>
        </div>
    );
}

export default Page3;

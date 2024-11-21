import React, { useState } from 'react';
import './Page.css'; // 스타일 파일을 임포트합니다.

function Page3({ goToPage, setReceiptItems }) {
    const [items, setItems] = useState([{ item: '', price: '' }]);

    const placeholders = [
        "우리 강아지 호두와의 산책",
        "Like a Fool - Sam Kim",
        "노들섬의 노을",
        "방어회와 소주",
        "무화과 향기"
    ];

    const handleChange = (index, event) => {
        const newItems = [...items];
        const { name, value } = event.target;

        if (name === 'price') {
            newItems[index][name] = value ? parseFloat(value) : '';
        } else {
            newItems[index][name] = value;
        }

        setItems(newItems);
    };

    const addItem = () => {
        const newIndex = items.length;
        const newPlaceholder = placeholders[newIndex % placeholders.length];
        setItems([...items, { item: '', price: '', placeholder: newPlaceholder }]);
    };

    const handleSubmit = () => {
        setReceiptItems(items);
        goToPage('page4');
    };

    return (
        <div className="container">
            <div className='p3-text'>어떤 점들이</div>
            <div className='p3-text'>추억을 소중하게 만드나요?</div>
            <p className="small-text">(사랑하는 사람, 선선하게 부는 바람, 좋아하는 노래 제목 등 다양하게 적어주세요!)</p>
            <p className="small-text">(각 목록이 소중한 추억에서 차지하는 정도를 함께 적어주세요!)</p>
            
            <div className="input-labels">
                <label className="input-label">목록</label>
                <label className="input-label">정도 (1~100)</label>
            </div>
            <div className="input-container">
                {items.map((item, index) => (
                    <div className="input-row" key={index}>
                        <div className="input-group">
                            <input
                                type="text"
                                name="item"
                                placeholder={item.placeholder || "우리 강아지 호두와의 산책"} 
                                value={item.item}
                                onChange={(e) => handleChange(index, e)}
                                className="left-input"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                name="price"
                                placeholder="100"
                                value={item.price}
                                onChange={(e) => handleChange(index, e)}
                                className="right-input"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <p className="scroll-instruction">스크롤을 내리시면 추가된 목록이 보입니다 :)</p>
            
            <button onClick={addItem}>상품 추가</button>
            
            <div className="triangle-button-p3" onClick={handleSubmit} />
        </div>
    );
}

export default Page3;

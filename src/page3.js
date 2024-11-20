import React, { useState } from 'react';

function Page3({ goToPage, setReceiptItems }) {
    const [items, setItems] = useState([{ item: '', price: '' }]); // 상태 초기화

    // 미리 정의된 placeholder 배열
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

        // 숫자 입력 처리
        if (name === 'price') {
            newItems[index][name] = value ? parseFloat(value) : ''; // 빈 문자열로 초기화
        } else {
            newItems[index][name] = value;
        }

        setItems(newItems);
    };

    const addItem = () => {
        const newIndex = items.length;
        const newPlaceholder = placeholders[newIndex % placeholders.length]; // 순환하여 placeholder 설정
        setItems([...items, { item: '', price: '', placeholder: newPlaceholder }]); // 목록과 가격 입력칸 추가
    };

    const handleSubmit = () => {
        setReceiptItems(items); // 입력된 상품 정보를 상태로 설정
        goToPage('page4'); // 페이지 4로 이동하여 날짜 입력 받기
    };

    return (
        <div className="container">
            <div className='p3-text'>어떤 점들이</div>
            <div className='p3-text'>추억을 소중하게 만드나요?</div>
            <p className="small-text">(사랑하는 사람, 선선하게 부는 바람, 좋아하는 노래 제목 등 다양하게 적어주세요!)</p>
            <p className="small-text">(각 목록이 소중한 추억에서 차지하는 정도를 함께 적어주세요!)</p>
            <div className="input-container">
                {items.map((item, index) => (
                    <div className="input-row" key={index} style={{ marginBottom: '5px' }}>
                        {index === 0 ? (
                            <>
                                <div className="input-group">
                                    <label className="input-label">목록</label>
                                    <input
                                        type="text"
                                        name="item"
                                        placeholder={item.placeholder || "우리 강아지 호두와의 산책"} 
                                        value={item.item}
                                        onChange={(e) => handleChange(index, e)}
                                        className="left-input"
                                        style={{ marginRight: '20px' }}
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">가격 (10~999)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="999"
                                        value={item.price}
                                        onChange={(e) => handleChange(index, e)}
                                        className="right-input"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    name="item"
                                    placeholder={item.placeholder || "Like a Fool - Sam Kim"} 
                                    value={item.item}
                                    onChange={(e) => handleChange(index, e)}
                                    className="left-input"
                                    style={{ marginRight: '40px' }}
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="500"
                                    value={item.price}
                                    onChange={(e) => handleChange(index, e)}
                                    className="right-input"
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>

            <button onClick={addItem}>상품 추가</button>
            
            {/* 삼각형 버튼 */}
            <div className="triangle-button-p3" onClick={handleSubmit} />
        </div>
    );
}

export default Page3;

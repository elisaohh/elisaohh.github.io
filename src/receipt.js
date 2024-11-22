import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import inartLogo from './image/inartLogo.png'; 
import wallpaperReceipt from './image/wallpaper-receipt.png'; // 배경 이미지 임포트
import qrCodeImage from './image/qrcode.png'; // QR 코드 PNG 파일 임포트
import './receipt.css'; // CSS 파일 가져오기

const ReceiptPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        // body 배경 색상 변경
        document.body.style.backgroundImage = `url(${wallpaperReceipt})`; // 임포트한 이미지 사용
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";

        const params = new URLSearchParams(location.search);
        const itemsData = params.get('items');
        const nameParam = params.get('name');
        const dateParam = params.get('date');

        if (itemsData) {
            try {
                const decodedItems = decodeURIComponent(itemsData);
                const parsedItems = JSON.parse(decodedItems);
                
                // 가격을 숫자로 변환하고 기본값 설정
                const validatedItems = parsedItems.map(item => ({
                    ...item,
                    price: parseFloat(item.price) || 0
                }));

                setItems(validatedItems);
            } catch (error) {
                console.error("Error parsing items data:", error);
            }
        }

        if (nameParam) {
            setName(decodeURIComponent(nameParam));
        }

        if (dateParam) {
            setDate(decodeURIComponent(dateParam));
        }

        // 컴포넌트 언마운트 시 원래의 배경으로 되돌리기
        return () => {
            document.body.style.backgroundImage = "url('./image/wallpaper.jpg')"; // 기본 배경으로 되돌리기
        };
    }, [location.search]);

    // 합계 계산 (각 가격에 100 곱하기)
    const total = items.reduce((sum, item) => sum + (item.price * 100 || 0), 0);

    const handleDownload = () => {
        const receiptContainer = document.querySelector('.receipt-container');
    
        // 영수증의 전체 크기를 계산
        const totalHeight = receiptContainer.scrollHeight; // 전체 높이
        const totalWidth = receiptContainer.scrollWidth; // 전체 너비
    
        // 스크롤을 비활성화
        const originalOverflow = receiptContainer.style.overflow;
        receiptContainer.style.overflow = 'visible';
    
        html2canvas(receiptContainer, {
            scale: 2, // 해상도 향상
            allowTaint: true, // CORS 문제 우회
            width: totalWidth, // 전체 너비
            height: totalHeight, // 전체 높이
            scrollX: 0, // 스크롤 X 위치
            scrollY: 0, // 스크롤 Y 위치
            backgroundColor: null // 투명 배경으로 설정
        }).then(canvas => {
            // 배경이 포함된 영수증 이미지 생성
            canvas.toBlob(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `receipt_${name}_${date}.png`;
                link.click();
            });
        }).catch(error => {
            console.error('Error generating receipt image:', error);
        }).finally(() => {
            // 원래의 스크롤 상태 복원
            receiptContainer.style.overflow = originalOverflow;
        });
    };
    
    

    

    const handleHomeClick = () => {
        // 홈 버튼 클릭 시 홈 페이지로 이동
        setItems([]); // 상태 초기화
        setName('');
        setDate('')
        navigate('/'); // 홈 페이지로 이동
        window.location.reload(); // 페이지 새로 고침
    };

    return (
        <div className="receipt-page">
            <div className="receipt-container">
                <img src={inartLogo} alt="inartLogo" className="logo" />
                <h2 className="subtitle">MEMORABLE MOMENTS</h2>
                <p className="order-info">추억의 한 조각들</p>
                <p className="order-number">ORDER #{Math.floor(Math.random() * 10000)} FOR {name}</p>
                <p className="date">{date}</p>
                
                <hr className="separator" />

                <div className="header-row">
                    <div className="header-cell">Qty</div>
                    <div className="header-cell">Item</div>
                    <div className="header-cell">Amt</div>
                </div>

                <hr className="separator" />
                
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} className="receipt-item">
                            <div className="item-quantity">
                                <span className="item-index">{(index + 1).toString().padStart(2, '0')}</span>
                            </div>
                            <div className="item-name-container">
                                <span className="item-name">{item.item}</span>
                            </div>
                            <div className="item-price-container">
                                <span className="item-price">{(item.price * 100).toLocaleString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>영수증 정보가 없습니다.</p>
                )}
                <hr className="separator" />
                <div className="item-count">
                    <span>Item count:</span>
                    <span className="count-value">{items.length}</span>
                </div>
                <div className="total">
                    <span>Total:</span>
                    <span className="total-value">{total.toLocaleString()}</span>
                </div>

                <hr className="separator" />
                <div className="footer">
                    <p>CARD: ************1234</p>
                    <p>AUTO CODE: {Math.floor(Math.random() * 10000000000000)}</p>
                    <p>LABEL: INART SOCIETY</p>
                </div>
                <div className="qr-code-container">
                    <img 
                        src={qrCodeImage} // QR 코드 PNG 파일 사용
                        alt='QR Code' 
                        style={{ width: '200px', height: '200px' }} // 크기 조정
                    />
                </div>
            </div>

            <button onClick={handleDownload} className="download-button">영수증 다운로드</button>
            <button onClick={handleHomeClick} className="home-button">홈으로 돌아가기</button> {/* 홈 버튼 추가 */}
        </div>
    );
};

export default ReceiptPage;

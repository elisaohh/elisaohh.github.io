import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import QRCodeGenerator from './QRCodeGenerator';
import inartLogo from './image/인아트_로고-누끼.png'; 
import receiptBackground from './image/인아트_영수증 배경@4x.png'; 

const ReceiptPage = () => {
    const location = useLocation();
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
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
    }, [location.search]);

    // 합계 계산
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

    const handleDownload = () => {
        const receiptContainer = document.querySelector('.receipt-container');
        html2canvas(receiptContainer).then(canvas => {
            canvas.toBlob(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `receipt_${name}_${date}.png`;
                link.click();
            });
        }).catch(error => {
            console.error('Error generating receipt image:', error);
        });
    };

    return (
        <div style={styles.pageContainer}>
            <div className="receipt-container" style={{ ...styles.receiptContainer, backgroundImage: `url(${receiptBackground})` }}>
                <img src={inartLogo} alt="Art Logo" style={styles.logo} />
                <h2 style={styles.subtitle}>MEMORABLE MOMENTS</h2>
                <p style={styles.orderInfo}>추억의 한 조각들</p>
                <p style={styles.orderNumber}>ORDER #{Math.floor(Math.random() * 10000)} FOR {name}</p>
                <p style={styles.date}>{date}</p>
                
                <hr style={styles.separator} />

                {/* qty, item, amt 헤더 추가 */}
                <div style={styles.headerRow}>
                    <div style={styles.headerCell}>Qty</div>
                    <div style={styles.headerCell}>Item</div>
                    <div style={styles.headerCell}>Amt</div>
                </div>

                <hr style={styles.separator} />
                
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} className="receipt-item" style={styles.receiptItem}>
                            <div style={styles.itemQuantity}>
                                <span style={styles.itemIndex}>{(index + 1).toString().padStart(2, '0')}</span>
                            </div>
                            <div style={styles.itemNameContainer}>
                                <span style={styles.itemName}>{item.item}</span>
                            </div>
                            <div style={styles.itemPriceContainer}>
                                <span style={styles.itemPrice}>{item.price.toLocaleString()}원</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>영수증 정보가 없습니다.</p>
                )}
                <hr style={styles.separator} />
                <div style={styles.itemCount}>
                    <strong>Item count:</strong> {items.length}
                </div>
                <div style={styles.total}>
                    <strong>Total : </strong> {total.toLocaleString()}원
                </div>
                <hr style={styles.separator} />
                <div style={styles.footer}>
                    <p>CARD: ************1234</p>
                    <p>AUTO CODE: {Math.floor(Math.random() * 10000000000000)}</p>
                    <p>LABEL: INART SOCIETY</p>
                    <p>COPYRIGHT INART SOCIETY 2024</p>
                    <p>PRODUCED BY IKI</p>
                    <p>THANK YOU FOR VISITING!</p>
                </div>
                <div style={styles.qrCodeContainer}>
                    <QRCodeGenerator items={items} name={name} date={date} />
                </div>
            </div>

            {/* 다운로드 버튼을 전체 화면 오른쪽 하단으로 이동 */}
            <button onClick={handleDownload} style={styles.downloadButton}>영수증 다운로드</button>
        </div>
    );
};

// 스타일 설정
const styles = {
    pageContainer: {
        position: 'relative',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    receiptContainer: {
        border: '1px solid #333',
        padding: '20px',
        maxWidth: '400px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
        position: 'relative',
        lineHeight: '1.5',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    logo: {
        display: 'block',
        margin: '0 auto 10px auto',
        maxWidth: '100%',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: '24px',
        margin: '5px 0',
    },
    orderInfo: {
        textAlign: 'center',
        fontSize: '16px',
        margin: '5px 0',
    },
    orderNumber: {
        textAlign: 'center',
        fontSize: '16px',
        margin: '5px 0',
    },
    date: {
        textAlign: 'center',
        fontSize: '16px',
        margin: '5px 0',
    },
    separator: {
        border: 'none',
        borderTop: '1px dashed #333',
        margin: '10px 0',
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '5px 0',
    },
    headerCell: {
        flex: 1,
    },
    receiptItem: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px 0',
    },
    itemIndex: {
        width: '30px',
    },
    itemName: {
        flex: 1,
    },
    itemPrice: {
        width: '70px',
        textAlign: 'right',
    },
    total: {
        fontWeight: 'bold',
        marginTop: '10px',
        color: '#000',
    },
    qrCodeContainer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    downloadButton: {
        position: 'fixed', // 고정 위치
        bottom: '20px', // 화면 하단
        right: '20px', // 화면 오른쪽
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    footer: {
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#333',
    },
};

export default ReceiptPage;

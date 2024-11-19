import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import QRCodeGenerator from './QRCodeGenerator';

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
                setItems(JSON.parse(decodedItems)); // JSON으로 변환하여 상태 설정
            } catch (error) {
                console.error("Error parsing items data:", error);
            }
        } else {
            console.error("itemsData is not provided in the URL");
        }

        if (nameParam) {
            setName(decodeURIComponent(nameParam)); // 이름 설정
        }

        if (dateParam) {
            setDate(decodeURIComponent(dateParam)); // 날짜 설정
        }
    }, [location.search]);

    // 총합 계산
    const total = items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

    const handleDownload = () => {
        html2canvas(document.querySelector('.receipt-container')).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'receipt.png';
            link.click();
        });
    };

    return (
        <div className="receipt-container" style={styles.receiptContainer}>
            <h1 style={styles.title}>나만의 영수증</h1>
            {items.length > 0 ? (
                <div>
                    {items.map((item, index) => (
                        <div key={index} className="receipt-item" style={styles.receiptItem}>
                            <span style={styles.text}>{item.name}</span>
                            <span style={styles.text}>{parseFloat(item.price).toLocaleString()}원</span>
                        </div>
                    ))}
                    <div className="total" style={styles.total}>
                        <strong>합계:</strong> {total.toLocaleString()}원
                    </div>
                    <div className="receipt-info" style={styles.text}>
                        <strong>이름:</strong> {name}<br />
                        <strong>날짜:</strong> {date}
                    </div>
                </div>
            ) : (
                <p>영수증 정보가 없습니다.</p>
            )}
            <div className="qr-code-container" style={styles.qrCodeContainer}>
                <QRCodeGenerator items={items} name={name} date={date} />
            </div>
            <button onClick={handleDownload} style={styles.downloadButton}>영수증 다운로드</button>
        </div>
    );
};

// 스타일 설정
const styles = {
    receiptContainer: {
        border: '1px solid #333',
        padding: '20px',
        maxWidth: '400px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
    },
    title: {
        textAlign: 'center',
        color: '#000',
    },
    receiptItem: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px 0',
    },
    total: {
        fontWeight: 'bold',
        marginTop: '10px',
    },
    qrCodeContainer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    downloadButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    text: {
        color: '#000',
    },
};

export default ReceiptPage;

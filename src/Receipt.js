import React, { useRef, useEffect, useState } from 'react'; // useState와 useEffect 추가
import html2canvas from 'html2canvas';
import QRCodeGenerator from './QRCodeGenerator'; // QRCodeGenerator 임포트

const ReceiptPage = () => {
    const receiptRef = useRef();
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const itemsData = params.get('items');
        const nameParam = params.get('name');
        const dateParam = params.get('date');

        if (itemsData) {
            try {
                setItems(JSON.parse(decodeURIComponent(itemsData)));
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
    }, []);

    const handleDownload = () => {
        html2canvas(receiptRef.current, { useCORS: true, backgroundColor: null })
            .then((canvas) => {
                const url = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = url;
                link.download = 'receipt.png';
                link.click();
            });
    };

    let total = items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

    return (
        <div style={styles.receiptContainer} ref={receiptRef}>
            <h1 style={styles.title}>나만의 영수증</h1>
            <div>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} style={styles.receiptItem}>
                            <span style={styles.text}>{item.name}</span>
                            <span style={styles.text}>{parseFloat(item.price).toLocaleString()}원</span>
                        </div>
                    ))
                ) : (
                    <p>영수증 정보가 없습니다.</p>
                )}
                <div style={styles.total}>
                    <span style={styles.text}>합계:</span>
                    <span style={styles.text}>{total.toLocaleString()}원</span>
                </div>
                <div style={styles.total}>
                    <span style={styles.text}>이름: {name}</span>
                    <span style={styles.text}>날짜: {date}</span>
                </div>
            </div>

            <div style={styles.qrCodeContainer}>
                <QRCodeGenerator items={items} name={name} date={date} /> {/* QR 코드 생성 */}
                <button onClick={handleDownload} style={styles.downloadButton}>
                    영수증 다운로드
                </button>
            </div>
        </div>
    );
};

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

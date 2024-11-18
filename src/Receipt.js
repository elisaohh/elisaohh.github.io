import React, { useRef } from 'react'; // useState 제거
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';

const ReceiptPage = ({ items, name, date }) => {
    const receiptRef = useRef();

    const handleDownload = () => {
        html2canvas(receiptRef.current, { useCORS: true, backgroundColor: null }).then((canvas) => {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = 'receipt.png';
            link.click();
        });
    };

    // QR 코드에 포함할 URL 생성 (수정된 부분)
    const generateQRCodeValue = () => {
        const itemsData = JSON.stringify(items);
        const baseUrl = "https://elisaohh.github.io/receipt"; // 변경된 부분
        return `${baseUrl}?items=${encodeURIComponent(itemsData)}&name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}`;
    };

    let total = items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

    return (
        <div style={styles.receiptContainer} ref={receiptRef}>
            <h1 style={styles.title}>나만의 영수증</h1>
            <div>
                {items.map((item, index) => (
                    <div key={index} style={styles.receiptItem}>
                        <span style={styles.text}>{item.name}</span>
                        <span style={styles.text}>{parseFloat(item.price).toLocaleString()}원</span>
                    </div>
                ))}
                <div style={styles.total}>
                    <span style={styles.text}>합계:</span>
                    <span style={styles.text}>{total.toLocaleString()}원</span>
                </div>
                <div style={styles.total}>
                    <span style={styles.text}>이름: {name}</span>
                    <span style={styles.text}>날짜: {date}</span>
                </div>
            </div>

            {/* QR 코드와 다운로드 버튼을 포함하는 div */}
            <div style={styles.qrCodeContainer}>
                <h2 style={styles.text}>영수증 QR 코드</h2>
                <QRCodeCanvas value={generateQRCodeValue()} />
                {/* 다운로드 버튼 추가 */}
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

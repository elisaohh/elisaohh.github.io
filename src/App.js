import React, { useState } from 'react';
import Home from './Home'; // 홈 컴포넌트
import Page2 from './page2'; // 다른 페이지들
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import ReceiptPage from './Receipt'; // 영수증 페이지 컴포넌트
import QRCodeGenerator from './QRCodeGenerator'; // QR 코드 생성기

const App = () => {
    const [currentPage, setCurrentPage] = useState('home'); // currentPage 상태 추가
    const [receiptItems, setReceiptItems] = useState([]);
    const [receiptDate, setReceiptDate] = useState('');
    const [receiptName, setReceiptName] = useState('');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home goToPage={setCurrentPage} />;
            case 'page2':
                return <Page2 goToPage={setCurrentPage} />;
            case 'page3':
                return <Page3 goToPage={setCurrentPage} setReceiptItems={setReceiptItems} />;
            case 'page4':
                return <Page4 goToPage={setCurrentPage} setReceiptDate={setReceiptDate} />;
            case 'page5':
                return <Page5 goToPage={setCurrentPage} setReceiptName={setReceiptName} />;
            case 'receipt':
                return <ReceiptPage items={receiptItems} name={receiptName} date={receiptDate} />;
            case 'qrcode':
                return <QRCodeGenerator goToPage={setCurrentPage} />;
            default:
                return <Home goToPage={setCurrentPage} />; // 기본 페이지
        }
    };

    return (
        <div className="App">
            {renderPage()}
        </div>
    );
};

export default App;

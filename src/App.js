import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // 홈 컴포넌트
import Page2 from './Page2'; // 페이지 2 컴포넌트
import Page3 from './Page3'; // 페이지 3 컴포넌트
import Page4 from './Page4'; // 페이지 4 컴포넌트
import Page5 from './Page5'; // 페이지 5 컴포넌트
import ReceiptPage from './Receipt'; // 영수증 페이지 컴포넌트
import QRCodeGenerator from './QRCodeGenerator'; // QR 코드 생성기

const App = () => {
    const [receiptItems, setReceiptItems] = useState([]); // 영수증 아이템 상태
    const [receiptDate, setReceiptDate] = useState(''); // 영수증 날짜 상태
    const [receiptName, setReceiptName] = useState(''); // 영수증 이름 상태

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/page3" element={<Page3 setReceiptItems={setReceiptItems} />} />
                <Route path="/page4" element={<Page4 setReceiptDate={setReceiptDate} />} />
                <Route path="/page5" element={<Page5 setReceiptName={setReceiptName} />} />
                <Route path="/receipt" element={<ReceiptPage items={receiptItems} name={receiptName} date={receiptDate} />} />
                <Route path="/qrcode" element={<QRCodeGenerator />} />
            </Routes>
        </Router>
    );
};

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; // useNavigate 추가
import Home from './Home';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import ReceiptPage from './receipt';
import MessagePage from './Message'; // 새 페이지 임포트

const App = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
    const [receiptItems, setReceiptItems] = useState([]);
    const [receiptDate, setReceiptDate] = useState('');
    const [receiptName, setReceiptName] = useState('');

    const goToPage = (page) => {
        if (page === 'receipt') {
            const itemsData = encodeURIComponent(JSON.stringify(receiptItems));
            const nameData = encodeURIComponent(receiptName);
            const dateData = encodeURIComponent(receiptDate);
            navigate(`/receipt?items=${itemsData}&name=${nameData}&date=${dateData}`);
        } else {
            navigate(`/${page.toLowerCase()}`);
        }
    };

    return (
        <Routes>
            <Route path="/" element={<Home goToPage={goToPage} />} />
            <Route path="/page2" element={<Page2 goToPage={goToPage} />} />
            <Route path="/page3" element={<Page3 goToPage={goToPage} setReceiptItems={setReceiptItems} />} />
            <Route path="/page4" element={<Page4 goToPage={goToPage} setReceiptDate={setReceiptDate} />} />
            <Route path="/page5" element={<Page5 goToPage={goToPage} setReceiptName={setReceiptName} receiptItems={receiptItems} receiptDate={receiptDate} />} />
            <Route path="/receipt" element={<ReceiptPage />} />
            <Route path="/message" element={<MessagePage />} /> {/* 메시지 페이지 추가 */}
        </Routes>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;

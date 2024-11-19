import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import ReceiptPage from './Receipt';

const App = () => {
    const navigate = useNavigate();

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
        </Routes>
    );
};

const AppWrapper = () => (
    <Router basename="/receipt"> {/* basename 설정 추가 */}
        <App />
    </Router>
);

export default AppWrapper;

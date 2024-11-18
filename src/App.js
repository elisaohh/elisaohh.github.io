import React, { useState } from 'react';
import Home from './Home';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import ReceiptPage from './Receipt';
import QRCodeGenerator from './QRCodeGenerator';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
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
                return <ReceiptPage items={receiptItems} date={receiptDate} name={receiptName} />;
            default:
                return <QRCodeGenerator goToPage={setCurrentPage} />;
        }
    };

    return (
        <div className="App">
            {renderPage()}
        </div>
    );
}

export default App;

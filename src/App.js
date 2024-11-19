import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'; // 홈 컴포넌트
import Page2 from './page2'; // 다른 페이지들
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import ReceiptPage from './Receipt'; // 영수증 페이지 컴포넌트
import QRCodeGenerator from './QRCodeGenerator'; // QR 코드 생성기

const App = () => {
    const [receiptItems, setReceiptItems] = useState([]);
    const [receiptDate, setReceiptDate] = useState('');
    const [receiptName, setReceiptName] = useState('');

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/page2">
                    <Page2 />
                </Route>
                <Route path="/page3">
                    <Page3 setReceiptItems={setReceiptItems} />
                </Route>
                <Route path="/page4">
                    <Page4 setReceiptDate={setReceiptDate} />
                </Route>
                <Route path="/page5">
                    <Page5 setReceiptName={setReceiptName} />
                </Route>
                <Route path="/receipt">
                    <ReceiptPage items={receiptItems} name={receiptName} date={receiptDate} />
                </Route>
                <Route path="/qrcode">
                    <QRCodeGenerator />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;

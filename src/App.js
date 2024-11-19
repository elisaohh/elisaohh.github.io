import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

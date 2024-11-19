import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({ items, name, date }) => {
    const generateQRCodeValue = () => {
        const itemsData = JSON.stringify(items);
        const baseUrl = 'https://elisaohh.github.io/receipt'; // 영수증 페이지 경로
        const qrCodeUrl = `${baseUrl}?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}&items=${encodeURIComponent(itemsData)}`;
        console.log("QR Code URL:", qrCodeUrl); // QR 코드 URL 출력
        return qrCodeUrl;
    };

    const qrCodeUrl = generateQRCodeValue(); // QR 코드 URL 생성

    return (
        <div>
            <h2>영수증 QR 코드</h2>
            <QRCodeCanvas value={qrCodeUrl} />
        </div>
    );
};

export default QRCodeGenerator;

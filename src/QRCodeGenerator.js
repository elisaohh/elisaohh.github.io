import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({ items, name, date }) => {
    const generateQRCodeValue = () => {
        const itemsData = JSON.stringify(items);
        const baseUrl = 'http://your-external-ip:3000/download'; // 외부에서 접근 가능한 URL

        // 다운로드 URL 추가
        const downloadUrl = `${baseUrl}?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}&items=${encodeURIComponent(itemsData)}`;
        
        console.log("Download URL:", downloadUrl); // 다운로드 URL 출력
        return downloadUrl; // 다운로드 URL을 QR 코드 값으로 반환
    };

    const qrCodeUrl = generateQRCodeValue(); // QR 코드 URL 생성

    return (
        <div>
            <QRCodeCanvas 
                value={qrCodeUrl} 
                bgColor="transparent" // 배경색을 투명으로 설정
                fgColor="#000000" // QR 코드 색상 (필요시 수정)
            />
        </div>
    );
};

export default QRCodeGenerator;

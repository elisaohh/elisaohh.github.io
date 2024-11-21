import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = () => {
    // 메시지를 URL로 인코딩하여 QR 코드에 포함
    const generateQRCodeValue = () => {
        const message = "인아트의 첫 전시 '시소의 시선'은 재미있게 즐기셨나요? 영수증을 다이어리로 바라보았던 지금이 작품처럼, 새로운 시각으로 세상을 바라보는 경험이 되셨기를 바랍니다:) 감사합니다!";
        const encodedMessage = encodeURIComponent(message);
        const baseUrl = window.location.origin; // 현재 도메인을 가져옴
        const messagePath = `/message`; // 메시지를 표시할 경로

        // 메시지 URL 추가
        const messageUrl = `${baseUrl}${messagePath}?msg=${encodedMessage}`;
        
        console.log("Message URL:", messageUrl); // 메시지 URL 출력
        return messageUrl; // 메시지 URL을 QR 코드 값으로 반환
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

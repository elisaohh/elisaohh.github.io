import React from 'react';

const QRCodeGenerator = () => {
    // 새로운 QR 코드 이미지 URL
    const qrCodeImageUrl = 'https://cdn3.me-qr.com/qr/140021762.png?v=1732213569';
    const qrCodeLink = 'https://me-qr.com'; // QR 코드 클릭 시 이동할 링크

    return (
        <div style={{ textAlign: 'center', backgroundColor: 'transparent', padding: '10px' }}>
            <a href={qrCodeLink} style={{ cursor: 'pointer', display: 'block', border: '0' }}>
                <img 
                    src={qrCodeImageUrl} 
                    alt='Create qr code for free' 
                    style={{ border: '0', width: '200px', height: '200px' }} // 크기 조정
                />
            </a>
            <a href={qrCodeLink} style={{ cursor: 'default', display: 'none', border: '0' }}>
                Create qr code for free
            </a>
        </div>
    );
};

export default QRCodeGenerator;

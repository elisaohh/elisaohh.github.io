import React from 'react';
import { useLocation } from 'react-router-dom';

const MessagePage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const message = params.get('msg'); // URL에서 메시지 가져오기

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>전시 메시지</h2>
            <p>{decodeURIComponent(message)}</p> {/* 메시지 디코딩 후 표시 */}
        </div>
    );
};

export default MessagePage;
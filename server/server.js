const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// 영수증 다운로드 라우트
app.get('/download', (req, res) => {
    const { name, date, items } = req.query; // 요청 쿼리에서 데이터 가져오기

    // 영수증 데이터로 HTML 생성
    const receiptContent = `
        <h1>나만의 영수증</h1>
        <p>이름: ${name}</p>
        <p>날짜: ${date}</p>
        <h2>항목</h2>
        <ul>
            ${JSON.parse(decodeURIComponent(items)).map(item => `<li>${item.name}: ${parseFloat(item.price).toLocaleString()}원</li>`).join('')}
        </ul>
        <h3>합계: ${JSON.parse(decodeURIComponent(items)).reduce((sum, item) => sum + parseFloat(item.price), 0).toLocaleString()}원</h3>
    `;

    // 파일 이름 생성
    const fileName = `receipt_${name}_${date.replace(/-/g, '')}.png`;
    const filePath = path.join(__dirname, 'receipts', fileName);

    // HTML을 이미지로 변환하는 로직 추가 필요 (예: Puppeteer 사용)
    fs.writeFile(filePath, receiptContent, (err) => {
        if (err) {
            console.error("Error saving receipt:", err);
            return res.status(500).send("Error saving receipt");
        }

        // 다운로드 응답
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).send("Error downloading file");
            }
        });
    });
});

// 서버 시작
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

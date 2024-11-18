import React, { useState } from 'react';

function Page4({ setReceiptDate, goToPage }) {
    const [date, setDate] = useState({
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
        amPm: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDate((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const now = new Date();
        const formattedDate = (date.year === '' && date.month === '' && date.day === '' &&
                               date.hour === '' && date.minute === '' && date.amPm === '') 
            ? `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`
            : `${date.year}-${date.month.padStart(2, '0')}-${date.day.padStart(2, '0')} ${date.hour}:${date.minute.padStart(2, '0')} ${date.amPm}`;

        setReceiptDate(formattedDate); // 입력한 날짜와 시간을 상태로 설정
        goToPage('page5'); // 영수증 페이지로 이동
    };

    return (
        <div className="container">
            <h1>좋아하는 사진(추억)의 날짜와 시간을 적어주세요!</h1>

            <div className="date-time-container">
                <select name="year" onChange={handleChange} value={date.year}>
                    <option value="">년도</option>
                    {Array.from({ length: 6 }, (_, i) => (
                        <option key={i} value={2025 - i}>{2025 - i}</option>
                    ))}
                </select>

                <select name="month" onChange={handleChange} value={date.month}>
                    <option value="">월</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>

                <select name="day" onChange={handleChange} value={date.day}>
                    <option value="">일</option>
                    {Array.from({ length: 31 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>

                <select name="hour" onChange={handleChange} value={date.hour}>
                    <option value="">시</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>

                <select name="minute" onChange={handleChange} value={date.minute}>
                    <option value="">분</option>
                    {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i}>{i}</option>
                    ))}
                </select>

                <select name="amPm" onChange={handleChange} value={date.amPm}>
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>

            <button 
                className="triangle-button" 
                onClick={handleSubmit} // 입력 완료 후 다음 페이지로 이동
                style={{ position: 'absolute', bottom: '20px', right: '20px' }} // 오른쪽 하단에 위치 조정
            >
                다음
            </button>
        </div>
    );
}

export default Page4;

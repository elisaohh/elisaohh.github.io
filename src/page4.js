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
        
        // 모든 선택이 비어있을 경우 현재 시간으로 설정
        const selectedYear = date.year || now.getFullYear();
        const selectedMonth = date.month || (now.getMonth() + 1); // 1월은 0
        const selectedDay = date.day || now.getDate();
        const selectedHour = date.hour || 1;  // 기본값 1
        const selectedMinute = date.minute || 1; // 기본값 1
        const selectedAmPm = date.amPm || (now.getHours() >= 12 ? 'PM' : 'AM');

        const formattedDate = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')} ${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedAmPm}`;

        setReceiptDate(formattedDate); // 입력한 날짜와 시간을 상태로 설정
        goToPage('page5'); // Page5로 이동
    };

    return (
        <div className="container">
            <h1 className='p4-text'>좋아하는 사진(추억)의</h1>
            <h1 className='p4-text'>날짜와 시간을 적어주세요!</h1>
            <p className="small-text">기억나지 않으시면 그냥 넘어가도 괜찮습니다 :)</p>
            <p className="small-text">(작성하지 않을 경우, 현재 시간으로 표시됩니다!)</p>
            <div className="date-time-container">
                <select name="year" onChange={handleChange} value={date.year} className="date-select">
                    <option value="">년도</option>
                    {Array.from({ length: 101 }, (_, i) => (
                        <option key={i} value={1924 + i}>{1924 + i}</option>
                    ))}
                </select>

                <select name="month" onChange={handleChange} value={date.month} className="date-select">
                    <option value="">월</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>

                <select name="day" onChange={handleChange} value={date.day} className="date-select">
                    <option value="">일</option>
                    {Array.from({ length: 31 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>

                <select name="hour" onChange={handleChange} value={date.hour} className="date-select">
                    <option value="">시</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>

                <select name="minute" onChange={handleChange} value={date.minute} className="date-select">
                    <option value="">분</option>
                    {Array.from({ length: 59 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>

                <select name="amPm" onChange={handleChange} value={date.amPm} className="date-select">
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>

            {/* 삼각형 버튼 */}
            <div className="triangle-button-p3" onClick={handleSubmit} />
        </div>
    );
}

export default Page4;

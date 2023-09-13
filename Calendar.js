import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const moveMonth = (direction) => {
    const newDate = new Date(currentDate);
    direction === "next" ? newDate.setMonth(currentDate.getMonth() + 1) : newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  /*const generateMonthDays = (year, month) => {
    const getFirstDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();
    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

    let days = [];
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);
    const daysInPrevMonth = month === 1 ? getDaysInMonth(year - 1, 12) : getDaysInMonth(year, month - 1);

    // Add days from the previous month to fill up the week
    for (let i = 0; i < firstDay; i++) {
        days.push(daysInPrevMonth - i);
    }
    days.reverse();

    // Add days for the current month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    // Fill up the last week with days from the next month
    let nextMonthDay = 1;
    while (days.length % 7 !== 0) {
        days.push(nextMonthDay);
        nextMonthDay++;
    }
    

    return days;
};*/
const generateMonthDays = (year, month) => {
    const getFirstDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();
    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

    let days = [];
    const firstDay = getFirstDayOfMonth(year, month) === 0 ? 7 : getFirstDayOfMonth(year, month); // 일요일이 0으로 반환되므로 7로 변경
    const daysInMonth = getDaysInMonth(year, month);
    const daysInPrevMonth = month === 1 ? getDaysInMonth(year - 1, 12) : getDaysInMonth(year, month - 1);

    // Add days from the previous month to fill up the week
    for (let i = 1; i < firstDay; i++) {
        days.push(daysInPrevMonth - firstDay + i + 1);
    }

    // Add days for the current month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    return days;
};




  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  const days = generateMonthDays(currentDate.getFullYear(), currentDate.getMonth() + 1);

  const [isModalOpen, setIsModalOpen] = useState(false);  // 모달의 열림/닫힘 상태
const [selectedDate, setSelectedDate] = useState(null);  // 선택된 날짜
const [schedule, setSchedule] = useState({});  // 각 날짜별 일정 저장

const openModal = (day) => {
    setSelectedDate(day);
    setIsModalOpen(true);
};

const closeModal = () => {
    setIsModalOpen(false);
};


  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => moveMonth("prev")}>&lt;</button>
        <span>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</span>
        <button onClick={() => moveMonth("next")}>&gt;</button>
      </div>
      <div className="days-of-week">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="calendar-grid">
      {days.map((day, index) => (
                <div 
                    key={index} 
                    className={`day ${index < 7 && "non-current-month"}`}
                    onClick={() => openModal(day)}
                >
                    {day}
                </div>
            ))}
      </div>
        {
        isModalOpen && 
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>{selectedDate}일정</h2>
                <textarea 
                    value={schedule[selectedDate] || ''} 
                    onChange={e => setSchedule({...schedule, [selectedDate]: e.target.value})}
                />
                <button onClick={closeModal}>저장</button>
            </div>
        </div>
    }
     
    </div>
    
    
  );
};


export default Calendar;

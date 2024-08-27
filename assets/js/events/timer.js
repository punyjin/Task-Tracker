function calculateDeadline(monthsAgo = null, day = null, isNextMonth = false) {
    const now = new Date();
    let deadline = new Date(now);

    if (monthsAgo !== null) {
        // ลดจำนวนเดือน
        deadline.setMonth(now.getMonth() - monthsAgo);
    }

    if (day !== null) {
        // ตั้งวัน
        deadline.setDate(day);
    }

    if (isNextMonth) {
        // ไปยังเดือนถัดไป
        deadline.setMonth(now.getMonth() + 1);
        // ตั้งวันในเดือนถัดไป
        deadline.setDate(day);
    }

    return deadline.toISOString();
}

// ฟังก์ชันสำหรับการนับถอยหลัง
function updateCountdown(elementId, deadline) {
    const element = document.getElementById(elementId);

    function getCountdown() {
        const now = new Date();
        const end = new Date(deadline);
        const timeRemaining = end - now;

        if (timeRemaining < 0) {
            return 'ปิดแล้ว';
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    function update() {
        element.innerHTML = getCountdown();
    }

    // เรียกใช้งาน update ทุก 1 วินาที
    setInterval(update, 1000);
}

// ฟังก์ชันเพื่อจัดเก็บและเริ่มการนับถอยหลัง
export function initializeCountdowns() {
    // กำหนดวันสุดท้ายตามระยะเวลาที่ต้องการ
    const deadline1 = calculateDeadline(2); // 2 เดือนที่แล้ว
    const deadline2 = calculateDeadline(1); // 1 เดือนที่แล้ว
    const deadline3 = calculateDeadline(null, 31); // วันที่ 31 ของเดือนนี้
    const deadline4 = calculateDeadline(null, 31, true); // วันที่ 31 เดือนหน้า

    // จัดเก็บวันสุดท้ายใน localStorage
    localStorage.setItem('deadline1', deadline1);
    localStorage.setItem('deadline2', deadline2);
    localStorage.setItem('deadline3', deadline3);
    localStorage.setItem('deadline4', deadline4);

    // เริ่มการนับถอยหลัง
    updateCountdown('countdown1', localStorage.getItem('deadline1'));
    updateCountdown('countdown2', localStorage.getItem('deadline2'));
    updateCountdown('countdown3', localStorage.getItem('deadline3'));
    updateCountdown('countdown4', localStorage.getItem('deadline4'));
}


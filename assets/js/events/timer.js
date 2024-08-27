// ฟังก์ชันในการคำนวณวันสุดท้ายที่ต้องการ
function getSpecificDate(year, month, day) {
    return new Date(year, month - 1, day);
}

export let days_status = "";
export let cb_data_01 = [""];
export let cb_data_02 = [""];
export let cb_data_03 = [""];
export let cb_data_04 = [""];
export let squarebox_red = '<i class="fas fa-square" style="font-size: 20px;color:red;padding-right: 10px"></i>';
export let squarebox_yellow = '<i class="fas fa-square" style="font-size: 20px;color:#FDDA0D;padding-right: 10px"></i>';
export let squarebox_green = '<i class="fas fa-square" style="font-size: 20px;color:green;padding-right: 10px"></i>';

function updateCountdown(elementId, deadlineDate, cb_data) {
    const element = document.getElementById(elementId);

    function getCountdown() {
        const now = new Date();
        const end = new Date(deadlineDate);
        const timeRemaining = end - now;

        if (timeRemaining < 0) {
            cb_data[0] = 'Close'; // อัปเดต cb_data เป็น "Close"
            return squarebox_red + 'Close';
        }
        
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        if (days > 27) {
            cb_data[0] = 'Waiting'; // อัปเดต cb_data เป็น "Waiting"
            return squarebox_yellow + 'กำลังรอ';
        }

        cb_data[0] = 'Open'; // อัปเดต cb_data เป็น "Open"
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    function update() {
        element.innerHTML = getCountdown();
    }

    setInterval(update, 1000);
}

export function initializeCountdowns() {
    const deadlines = {
        deadline1: getSpecificDate(2024, 6, 28).toISOString(),
        deadline2: getSpecificDate(2024, 7, 26).toISOString(),
        deadline3: getSpecificDate(2024, 8, 30).toISOString(),
        deadline4: getSpecificDate(2024, 9, 27).toISOString()
    };

    Object.keys(deadlines).forEach(key => {
        localStorage.setItem(key, deadlines[key]);
    });

    updateCountdown('countdown1', localStorage.getItem('deadline1'), cb_data_01);
    updateCountdown('countdown2', localStorage.getItem('deadline2'), cb_data_02);
    updateCountdown('countdown3', localStorage.getItem('deadline3'), cb_data_03);
    updateCountdown('countdown4', localStorage.getItem('deadline4'), cb_data_04);
}

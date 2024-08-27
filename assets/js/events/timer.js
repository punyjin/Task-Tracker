function getSpecificDate(year, month, day) {
    return new Date(year, month - 1, day);
}
function updateCountdown(elementId, deadlineDate) {
    const element = document.getElementById(elementId);

    function getCountdown() {
        const now = new Date();
        const end = new Date(deadlineDate);
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

    updateCountdown('countdown1', localStorage.getItem('deadline1'));
    updateCountdown('countdown2', localStorage.getItem('deadline2'));
    updateCountdown('countdown3', localStorage.getItem('deadline3'));
    updateCountdown('countdown4', localStorage.getItem('deadline4'));
}
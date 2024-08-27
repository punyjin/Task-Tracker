import { app, database, ref, set, get, onValue } from '../fb_config.js';
import { getLatestWork } from '../events/modal_work.js';
import { cb_data_01, cb_data_02, cb_data_03, cb_data_04, squarebox_red, squarebox_yellow, squarebox_green } from './timer.js';

function fetchData() {
    const taskRef = ref(database, 'tasks');
    onValue(taskRef, (snapshot) => {
        const tasks = snapshot.val();
        if (tasks) {
            const tbody = document.querySelector('#taskTable tbody');
            tbody.innerHTML = '';

            for (const [taskId, taskData] of Object.entries(tasks)) {
                if (taskId === 'null') continue;

                const row = document.createElement('tr');
                const latestWork = getLatestWork(taskData.scorebox_3);

                // ตรวจสอบค่า cb_data ก่อนใช้
                const cbData1 = cb_data_01[0] || 'Open'; // หรือค่าที่เหมาะสมอื่น
                const cbData2 = cb_data_02[0] || 'Open';
                const cbData3 = cb_data_03[0] || 'Open';
                const cbData4 = cb_data_04[0] || 'Open';

                function getSquareboxIcon(checked, cb_data) {
                    if (cb_data === "Waiting") {
                        return checked ? squarebox_yellow : squarebox_red;
                    } else if (cb_data === "Open") {
                        return checked ? squarebox_green : squarebox_red;
                    } else if (cb_data === "Close") {
                        return squarebox_red;
                    }
                    return squarebox_red;
                }

                row.innerHTML = `
                    <td>${taskData.subject}</td>
                    <td>${getSquareboxIcon(taskData.checked_c1, cbData1)} ${taskData.checked_c1 ? 'เปิดอยู่' : 'ปิดแล้ว'}</td>
                    <td>${getSquareboxIcon(taskData.checked_c2, cbData2)} ${taskData.checked_c2 ? 'เปิดอยู่' : 'ปิดแล้ว'}</td>
                    <td>${getSquareboxIcon(taskData.checked_c3, cbData3)} ${taskData.checked_c3 ? 'เปิดอยู่' : 'ปิดแล้ว'}</td>
                    <td>${getSquareboxIcon(taskData.checked_c4, cbData4)} ${taskData.checked_c4 ? 'เปิดอยู่' : 'ปิดแล้ว'}</td>
                    <td>${taskData.checked_all ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}</td>
                    <td>${latestWork}</td>
                    <td><button style="border-radius: 5px;" onclick="showDetails('${taskId}')">ดูรายละเอียด</button></td>
                `;
                tbody.appendChild(row);
            }
        } else {
            console.log("No data available");
        }
    });
}

function handleDaysStatusChange(event) {
    console.log("Days Status Updated:", event.detail);
    fetchData();
}

document.addEventListener('daysStatusChange', handleDaysStatusChange);

export { fetchData };

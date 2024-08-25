import { app, database, ref, set, get, onValue } from '../fb_config.js';
import { getLatestWork } from '../events/modal_work.js';

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
                let squarebox_red = '<i class="fas fa-square" style="font-size: 20px;color:red;padding-right: 10px"></i>';
                let squarebox_green = '<i class="fas fa-square" style="font-size: 20px;color:green;padding-right: 10px"></i>';
                
                function getSquareboxIcon(checked) {
                    return checked ? squarebox_green  : squarebox_red ;
                }
                row.innerHTML = `
                    <td>${taskData.subject}</td>
                    <td>${getSquareboxIcon(taskData.checked_c1)} ${taskData.checked_c1 ? 'เปิดอยู่' : 'ปิดแล้ว'}</td>
                    <td>${getSquareboxIcon(taskData.checked_c2)} ${taskData.checked_c2 ? 'เปิดอยู่' : 'ปิดแล้ว'}</td>
                    <td>${getSquareboxIcon(taskData.checked_c3)} ${taskData.checked_c3 ? 'เปิดอยู่' : 'ปิดแล้ว'}</td>
                    <td>${getSquareboxIcon(taskData.checked_c4)} ${taskData.checked_c4 ? 'เปิดอยู่' : 'ปิดแล้ว'}</td>
                    <td>${taskData.checked_all ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}</td>
                    <td>${latestWork}</td>
                    <td><button style="border-radius: 5px;" onclick="showDetails('${taskId}')">ดูรายละเอียด</button></td>
                `;
                tbody.appendChild(row);
            }
        } else {
            console.log("No data available");
        }
    }, {
        onlyOnce: true
    });
}
export { fetchData };
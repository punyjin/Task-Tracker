import { app, database, ref, set, get, onValue } from '../fb_config.js';


function showDetails(taskId) {
    const taskRef = ref(database, 'tasks/' + taskId);
    get(taskRef).then((snapshot) => {
        if (snapshot.exists()) {
            const taskData = snapshot.val();
            document.getElementById('modalSubject').textContent = "ชื่อวิชา " + taskData.subject; //ชื่อวิชา
            document.getElementById('modalScoreTitle').textContent = `ช่องคะแนนที่ ${taskId}`;
            document.getElementById('modalTaskName').value = taskData.work1.WorkInfo; //งานล่าสุด
            document.getElementById('modalTaskDetails').value = taskData.details; //ข้อมูลงาน
            document.getElementById('modalTaskCompleted').checked = taskData.checked_all;

            document.getElementById('work1Status').checked = taskData.work1.WorkStatus;
            document.getElementById('work2Status').checked = taskData.work2.WorkStatus;
            document.getElementById('work3Status').checked = taskData.work3.WorkStatus;
            document.getElementById('work4Status').checked = taskData.work4.WorkStatus;

            const modal = document.getElementById('detailsModal');
            modal.style.display = 'block';
        } else {
            console.log("No data found for task:", taskId);
        }
    }).catch((error) => {
        console.error("Error fetching task details:", error);
    });
}

function closeModal() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'none';
}
export { closeModal , showDetails };
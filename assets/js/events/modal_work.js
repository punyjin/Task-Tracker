import { app, database, ref, set, get, onValue } from '../fb_config.js';

function getLatestWork(scorebox) {
    if (scorebox.WorkInfo_02 && scorebox.WorkInfo_02.Name) {
        return `งานชิ้นที่ 2 : ${scorebox.WorkInfo_02.Name}`;
    } else if (scorebox.WorkInfo_01 && scorebox.WorkInfo_01.Name) {
        return `งานชิ้นที่ 1 : ${scorebox.WorkInfo_01.Name}`;
    } else {
        return 'ไม่มีงานที่แสดง';
    }
}


function showDetails(taskId) {
    const taskRef = ref(database, 'tasks/' + taskId);
    get(taskRef).then((snapshot) => {
        if (snapshot.exists()) {
            const taskData = snapshot.val();
            const latestWork = getLatestWork(taskData.scorebox_3);

            document.getElementById('subject_data_id').value = taskId;
            document.getElementById('modalSubject').textContent = "รายละเอียดเพิ่มเติม " //
            document.getElementById('modalScoreTitle').textContent = taskData.subject; //`ช่องคะแนนที่ ${taskId}`;
            document.getElementById('modalTaskName').value = latestWork; //งานล่าสุด
            document.getElementById('modalTaskDetails').value = taskData.details; //ข้อมูลงาน
            document.getElementById('modalTaskCompleted').checked = taskData.checked_all;

            //Sector Score Box 3
            document.getElementById('cb_sb3_item_1').checked = taskData.scorebox_3.WorkInfo_01.WorkStatus; //cb = checkbox  // sb = scorebox
            document.getElementById('cb_sb3_item_2').checked = taskData.scorebox_3.WorkInfo_02.WorkStatus; //name = Name
            document.getElementById('name_sb3_item_1').value = "งานชิ้นที่ 1 " + taskData.scorebox_3.WorkInfo_01.Name; // dt = details
            document.getElementById('name_sb3_item_2').value = "งานชิ้นที่ 2 " +taskData.scorebox_3.WorkInfo_02.Name;
            //Sector Score Box 4
            document.getElementById('cb_sb4_item_1').checked = taskData.scorebox_4.WorkInfo_01.WorkStatus;
            document.getElementById('cb_sb4_item_2').checked = taskData.scorebox_4.WorkInfo_02.WorkStatus;
            document.getElementById('name_sb4_item_1').value = "งานชิ้นที่ 1 " + taskData.scorebox_4.WorkInfo_01.Name;
            document.getElementById('name_sb4_item_2').value = "งานชิ้นที่ 2 " + taskData.scorebox_4.WorkInfo_02.Name;
            
            //Sector All Box
            //document.getElementById('work1Status').checked = taskData.scorebox_1.WorkInfo_Main.WorkStatus;
            //document.getElementById('work2Status').checked = taskData.scorebox_2.WorkInfo_Main.WorkStatus;
            document.getElementById('work3Status').checked = taskData.scorebox_3.WorkInfo_Main.WorkStatus;
            document.getElementById('work4Status').checked = taskData.scorebox_4.WorkInfo_Main.WorkStatus;

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
export { closeModal , showDetails , getLatestWork };
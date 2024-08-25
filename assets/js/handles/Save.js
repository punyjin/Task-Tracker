import { database, ref, set, get } from '../fb_config.js';
import { fetchData } from '../events/fetchData.js';
function handleSave() {
    const taskId = document.getElementById('modalScoreTitle').textContent.split('ช่องคะแนนที่ ')[1];
    const taskRef = ref(database, 'tasks/' + taskId);
    
    // Fetch existing data before updating
    get(taskRef).then((snapshot) => {
        if (snapshot.exists()) {
            const existingData = snapshot.val();
            const updatedData = {
                ...existingData,
                checked_all: document.getElementById('modalTaskCompleted').checked,
                work1: {
                    ...existingData.work1,
                    WorkStatus: document.getElementById('work1Status').checked
                },
                work2: {
                    ...existingData.work2,
                    WorkStatus: document.getElementById('work2Status').checked
                },
                work3: {
                    ...existingData.work3,
                    WorkStatus: document.getElementById('work3Status').checked
                },
                work4: {
                    ...existingData.work4,
                    WorkStatus: document.getElementById('work4Status').checked
                }
            };

            // Save updated data
            set(taskRef, updatedData)
                .then(() => {
                    console.log('Data updated successfully! Task:', taskId);
                    console.log(updatedData);
                    alert("บันทึกสำเร็จ !");
                    closeModal(); // Close modal after saving
                    fetchData(); // Refresh the table data
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                });
        } else {
            console.log("No data found for task:", taskId);
        }
    }).catch((error) => {
        console.error("Error fetching existing task data:", error);
    });
}
export { handleSave };
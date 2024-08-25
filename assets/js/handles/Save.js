import { database, ref, set, get } from '../fb_config.js';
import { fetchData } from '../events/fetchData.js';

function handleSave() {
    const taskId = document.getElementById('subject_data_id').value;
    const taskRef = ref(database, 'tasks/' + taskId);

    get(taskRef).then((snapshot) => {
        if (snapshot.exists()) {
            const existingData = snapshot.val();
            const updatedData = {
                ...existingData,
                checked_all: document.getElementById('modalTaskCompleted').checked,
                scorebox_3: {
                    ...existingData.scorebox_3,
                    WorkInfo_01: {
                        ...existingData.scorebox_3.WorkInfo_01,
                        WorkStatus: document.getElementById('cb_sb3_item_1').checked,
                        Name: document.getElementById('name_sb3_item_1').value
                    },
                    WorkInfo_02: {
                        ...existingData.scorebox_3.WorkInfo_02,
                        WorkStatus: document.getElementById('cb_sb3_item_2').checked,
                        Name: document.getElementById('name_sb3_item_2').value
                    },
                },
                scorebox_4:{
                    ...existingData.scorebox_4,
                    WorkInfo_01: {
                        ...existingData.scorebox_4.WorkInfo_01,
                        WorkStatus: document.getElementById('cb_sb4_item_1').checked
                    },
                    WorkInfo_02: {
                        ...existingData.scorebox_4.WorkInfo_02,
                        WorkStatus: document.getElementById('cb_sb4_item_2').checked
                    }
                }
                // Additional scoreboxes can be added here as needed.
            };

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

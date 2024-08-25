import { handleSave, closeModal, showDetails, fetchData } from "./eventHandlers.js";
import { onAuthStateChanged, auth } from "./fb_config.js";
import { f_SignOut } from "./events/signout.js";

let username = document.getElementById('uidname');
function userdatadetails(email) {
    switch (email) {
        case "test@test.com":
            return "ผู้ทดสอบระบบ";
        case "admin@admin.com":
            return "Admin";
        case "wapakrit@gmail.com":
            return "Wapakrit";
        default:
            return "Undefine User";
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        username.innerHTML = userdatadetails(user.email);
    } else {
        console.log('No user is signed in.');
        Swal.fire({
            icon: 'success',
            title: 'ไม่ได้เข้าสู่ระบบ',
            text: 'กรุณาเข้าสู่ระบบก่อนดำเนินการต่อ',
        }).then(() => {
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
});

window.showDetails = showDetails;
window.closeModal = closeModal;

document.getElementById('logoutButton').addEventListener('click', f_SignOut);
document.getElementById('saveButton').addEventListener('click', handleSave);
document.querySelector('#detailsModal .btn-close').addEventListener('click', closeModal);
document.querySelector('#detailsModal .btn-secondary').addEventListener('click', closeModal);

fetchData();
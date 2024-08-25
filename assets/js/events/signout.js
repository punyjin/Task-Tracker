import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';

const auth = getAuth();

export function f_SignOut() {
    document.getElementById('logoutButton').addEventListener('click', () => {
        const buttonsignout = document.getElementById('logoutButton');
        signOut(auth).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'ออกจากระบบ',
                text: 'ออกจากระบบสําเร็จ',
            }).then(() => {
                buttonsignout.disabled = true;
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            });
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'ข้อผิดพลาดขณะออกจากระบบ : ' + errorMessage,
                footer: 'Error code: ' + errorCode
            });

            console.error('ข้อผิดพลาดขณะออกจากระบบ :', errorCode, errorMessage);
        });
    });
}

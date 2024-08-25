import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import { auth } from '../fb_config.js';



document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('remember').checked;
    const buttonlogin = document.querySelector('#loginForm button[type="submit"]');
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (rememberMe) {
                localStorage.setItem('email', email);
            } else {
                localStorage.removeItem('email');
            }
            swal.fire({
                icon: 'success',
                title: 'เข้าสู่ระบบสําเร็จ',
                text: 'ยินดีต้อนรับกลับคุณ ' + user.email
            })
            console.log('User signed in:', user);
            buttonlogin.disabled = true;
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            let swalOptions = {
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ' + errorMessage
            };
            switch (errorCode) {
                case 'auth/invalid-email':
                    swalOptions.text = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
                    break;
                case 'auth/user-not-found':
                    swalOptions.text = 'ไม่พบอีเมลของท่านในระบบ กรุณาตรวจสอบและลองใหม่อีกครั้ง';
                    break;
                case 'auth/wrong-password':
                    swalOptions.text = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
                    break;
                case 'auth/network-request-failed':
                    swalOptions.text = 'การเชื่อมต่อเครือข่ายล้มเหลว กรุณาตรวจสอบการเชื่อมต่อของท่านและลองใหม่อีกครั้ง \nหากนี่ไม่ใช่ข้อผิดพลาดของเครือข่าย กรุณาติดต่อผู้ดูแลระบบ';
                    break;
                case 'auth/too-many-requests':
                    swalOptions.text = 'การส่งคำขอถี่เกินไป กรุณาลองใหม่อีกครั้งภายหลัง';
                    break;
                case 'auth/invalid-credential':
                    swalOptions.text = 'เกิดข้อผิดพลาด : Invalid-credential กรุณาลองใหม่อีกครั้ง';
                    break;
                default:
                    swalOptions.text = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ' + errorMessage;
            }
        Swal.fire(swalOptions);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
        document.getElementById('username').value = savedEmail;
        document.getElementById('remember').checked = true;
    }
});
const emailInputElement=document.querySelector('.input-container #email');
const passwordInputElement=document.querySelector('.input-container #password');

emailInputElement.addEventListener('input',()=>{
    emailInputElement.classList.remove('input-error');
})

passwordInputElement.addEventListener('input',()=>{
    passwordInputElement.classList.remove('input-error');
})

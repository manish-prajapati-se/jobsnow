const nameInputElement=document.querySelector('.input-container #fullname');
const emailInputElement=document.querySelector('.input-container #email');
const passwordInputElement=document.querySelector('.input-container #password');

nameInputElement.addEventListener('input',()=>{
    nameInputElement.classList.remove('input-error');
})

emailInputElement.addEventListener('input',()=>{
    emailInputElement.classList.remove('input-error');
})

passwordInputElement.addEventListener('input',()=>{
    passwordInputElement.classList.remove('input-error');
})
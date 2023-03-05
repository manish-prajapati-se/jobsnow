const inputElements=document.querySelectorAll('.input-container input');
const selectElements=document.querySelectorAll('.select-option-container select');
const textareaElement=document.querySelector('textarea');

textareaElement.addEventListener('focus',()=>{
    textareaElement.classList.remove('input-error');
    textareaElement.nextElementSibling.remove();
})

for(const inputElement of inputElements){
    inputElement.addEventListener('focus',()=>{
        inputElement.classList.remove('input-error');
        inputElement.nextElementSibling.remove();
    })
}

for(const selectElement of selectElements){
    selectElement.addEventListener('focus',()=>{
        selectElement.classList.remove('input-error');
        selectElement.nextElementSibling.remove();
    })
}
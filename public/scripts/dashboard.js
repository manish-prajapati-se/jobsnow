const deleteJobElement=document.querySelector('form #delete');
const formElement=document.querySelector('#delete-job');

deleteJobElement.addEventListener('click',()=>{
    formElement.submit();
})
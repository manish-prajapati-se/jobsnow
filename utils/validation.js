const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex=/^[a-zA-Z ]*$/;



function isEmailValid(email){
    if(email && email.match(emailRegex)) return true;
    return false;
}

function isPasswordValid(password){
    if(password && password.trim().length>=8) return true;
    return false;
}


function isNameValid(name){
    if(name && name.match(nameRegex)) return true;
    return false;
}

module.exports={
    isEmailValid:isEmailValid,
    isPasswordValid:isPasswordValid,
    isNameValid:isNameValid
}
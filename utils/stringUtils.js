function sliceText(detailedText){
    const maxLength=180;
    let briefText;
    if(detailedText.length>maxLength){
        briefText=detailedText.slice(0,maxLength);
        briefText+="...";
    }else return detailedText;
    return briefText;
}

module.exports=sliceText;
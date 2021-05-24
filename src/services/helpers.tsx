export const excerpt = (paragraph:string , wordCount:number) => {
    return paragraph.split(' ').slice(0,wordCount).join(' ') + " ...";
}

export const arrayToCSV = (arr:object[] , key:any , length?:number) => {
    let nn = arr.map((el:any) => {
        return el[0][key];
    });
    if(nn.length > 3){
        return nn.slice(0,length).join(' , ') + " ..."
    }else{
        return nn.join(' , ')
    }
}
export const capitalizeFirstLetter = (string:string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatClockTime = (time:string) =>{
    console.log(!/^[a-zA-Z]+$/.test(time))
    if(!/^[a-zA-Z]+$/.test(time)){

        let formatedTime:string[] = [];
        let timeArr = time.split(':').map((str)=>{
            return str.length === 1 ? '0' + str : str;
        });
        timeArr[1] += 'min';
        formatedTime[1]=timeArr[1];
        if(timeArr[0] !== '00'){
            timeArr[0] += 'h ';
            formatedTime[0] = timeArr[0]; 
        }
        
        return formatedTime.join('')
    }else{
        return time
    }
    
}
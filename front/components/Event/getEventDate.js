export const monthOddEven = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const getMonth = (event) => {
    const date = event.split("T")[0];
    const intMonth = parseInt(date.split("-")[1]);
    const month = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
    return(month[intMonth-1]);
}

export const getDay = (event) => {
    const date = event.split("T")[0];
    return(date.split("-")[2]);
}

export const getYear = (event) => {
    const date = event.split("T")[0];
    return(date.split("-")[0]);
}

export const getDiffMinutes = (event) => {
    const time = event.createdAt.split("T")[1].split(":");
    const pastHour = parseInt(time[0]);
    const pastMinitue = parseInt(time[1]);
    const pastDay = parseInt(getDay(event.createdAt));
    const presentTime = new Date();
    const presentDay = presentTime.getDate();
    const presentHour = presentTime.getHours();
    const presentMinitue = presentTime.getMinutes();
    const countHours = (presentDay - pastDay)*24;
    return (Math.round((new Date().getTime() - new Date(event.createdAt).getTime())/60000))
    /* if(countHours > 0) {
        return((presentHour+countHours)*60+presentMinitue - ((pastHour+7)*60+pastMinitue));
    }
    else {
        return((presentHour*60+presentMinitue) - ((pastHour+7)*60+pastMinitue));
    } */
}

export const getDiffMonth = (startDate, endDate) => {
    const start = startDate.split("T")[0];
    const startIntDay = parseInt(start.split("-")[2]);
    const startIntMonth = parseInt(start.split("-")[1]);
    const end = endDate.split("T")[0];
    const endIntDay = parseInt(end.split("-")[2]);
    const endIntMonth = parseInt(end.split("-")[1]);
    if(endIntMonth - startIntMonth > 0) {
        return([Math.abs(endIntDay + (monthOddEven[startIntMonth-1] - startIntDay) + 1), endIntMonth - startIntMonth]);
    }
    else {
        return([Math.abs(endIntDay - startIntDay) + 1, endIntMonth - startIntMonth]);
    }  
}
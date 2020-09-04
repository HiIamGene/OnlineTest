import dayjs from 'dayjs'

export const getYearData = () => {
    let yearData = []
    for(let i = dayjs().$y ; i > 1920 ; i--){
        yearData.push(i)
    }
    return yearData
}
export const getMonthData = ()=> {
    return [{id : 0,value : "Jan"} ,{id : 1,value :"Feb"} , {id : 2,value :"Mar"} ,{id : 3,value :"Apr"} , {id : 4,value :"May"} ,{id : 5,value : "Jun"} , {id : 6,value :"July"} , {id : 7,value :"Aug"} , {id : 8,value :"Sep"} , {id : 9,value :"Oct"} , {id : 10,value :"Nov"} , {id : 11,value :"Dec"}]
}
export const getDayData = (year , month) => {
    let dayDate = []
    for(let i =new Date(year, month, 0).getDate() ;i >0 ; i-- ){
        dayDate.push(i)
    }
    return dayDate
    
}
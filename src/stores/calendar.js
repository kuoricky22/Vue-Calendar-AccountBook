import { ref } from "vue";
import { defineStore } from "pinia";

export const useCalendarStore = defineStore("calendar", () => {
    const nowYear = ref(new Date().getFullYear());
    const nowMonth = ref(new Date().getMonth() + 1);
    const weekName = ref(['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'])
    const dateTable = ref([]);

    function setMonthDays(){
        const currMonth = getMonthDetail(nowYear.value, nowMonth.value);
        const nextMonth = getMonthDetail(nowYear.value, nowMonth.value + 1);
        const prevMonth = getMonthDetail(nowYear.value, nowMonth.value - 1);

        const lastDateMonth = currMonth[currMonth.length - 1].substring(8, 10);
        const startDayOfWeek = new Date(nowYear.value, nowMonth.value, 1).getDay();
        const lastDayOfWeek = new Date(nowYear.value, nowMonth.value, lastDateMonth).getDay();

        const prevMonthArray = prevMonth.slice(prevMonth.length - startDayOfWeek);
        const nextMonthArray = nextMonth.slice(0, 6 - lastDayOfWeek);

        dateTable.value = prevMonthArray.map(date => ({date, today: false, disable: true, accountList:[]}))
        .concat(currMonth.map(date => ({date, today: isToday(date), disable: false, accountList:[]})))
        .concat(nextMonthArray.map(date => ({date, today: false, disable: true, accountList:[]})));
    }

    function nextMonth(){
        nowMonth.value++;
        if(nowMonth.value == 13){
            nowYear.value++;
            nowMonth.value = 1;
        }
        setMonthDays();
    }

    function prevMonth(){
        nowMonth.value--;
        if(nowMonth.value == -1){
            nowYear.value--;
            nowMonth.value = 12
        }
        setMonthDays();
    }



    function getMonthDetail(year, month){
        let lastDay = new Date(year, month, 0).getDate();
        return Array(lastDay).fill().map((_, key) => {
            let date = new Date(year, month-1, key+1)
            date.setHours(date.getHours() + 8)
            return date.toISOString().slice(0, 10)
        });
    }

    function isToday(date) {
        let now = new Date();
        now.setHours(now.getHours() + 8)
        return now.toISOString().slice(0, 10) === date ? true : false
    }

    return{nowYear, nowMonth, weekName, dateTable, nextMonth, prevMonth, setMonthDays}
});

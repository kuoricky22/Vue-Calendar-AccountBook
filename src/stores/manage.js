import { ref, reactive } from "vue";
import { uuid } from "vue-uuid";
import { defineStore } from "pinia";
import { useCalendarStore } from "../stores/calendar.js";

export const useManageStore = defineStore("manage", () => {
  const calendarStore = useCalendarStore();

  const recordDate = ref("");
  const recordConsumeType = ref("");
  const recordPayType = ref("");
  const recordMoney = ref("");
  const recordMemo = ref("");

  const recordDetail = ref([]);
  const totalMoney = ref(0);

  function setRecordDetail() {
    let detail = {
      id: uuid.v4(),
      date: recordDate.value,
      ConsumeType: recordConsumeType.value,
      PayType: recordPayType.value,
      Money: recordMoney.value,
      Memo: recordMemo.value,
    };
    calendarStore.dateTable.map((item) => {
      if (recordDate.value === item.date) {
        item.accountList.push(detail);
      }
    });
    totalMoney.value += parseInt(recordMoney.value);
    getRecordDetail(recordDate.value)
  }

  function getRecordDetail(recordDate){
    calendarStore.dateTable.map((item) =>{
      if(item.date === recordDate){
        recordDetail.value = item.accountList;
      }
    })
  }
  
  const optionConsumeType = ref([
    { value: "A", text: "飲食" },
    { value: "B", text: "娛樂" },
    { value: "C", text: "醫療" },
    { value: "D", text: "繳費" },
    { value: "E", text: "交通" },
  ]);

  const optionPayType = ref([
    { value: "Money", text: "現金" },
    { value: "CreditCard", text: "信用卡" },
    { value: "EasyCard", text: "悠遊卡" },
  ]);

  return {
    recordDate,
    recordConsumeType,
    recordPayType,
    recordMoney,
    recordMemo,
    recordDetail,
    totalMoney,
    optionConsumeType,
    optionPayType,
    setRecordDetail,
    getRecordDetail
  };
});

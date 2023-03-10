import { ref, reactive } from "vue";
import { uuid } from "vue-uuid";
import { defineStore } from "pinia";
import { useCalendarStore } from "../stores/calendar.js";
import { useModalStore } from "../stores/modal";

export const useManageStore = defineStore("manage", () => {
  const calendarStore = useCalendarStore();
  const modalStore = useModalStore();

  const recordDate = ref("");
  const recordConsumeType = ref("");
  const recordPayType = ref("");
  const recordMoney = ref("");
  const recordMemo = ref("");

  const recordList = ref([]);
  const recordDetailID = ref("");
  const isEdit = ref(false);
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
    getRecordList(recordDate.value);
    modalStore.closeModal();
  }

  function editRecordDetail() {
    let editDate = "";

    recordList.value.map((item) => {
      if (item.id === recordDetailID.value) {
        editDate = item.date
        totalMoney.value -= item.Money

        item.ConsumeType = recordConsumeType.value;
        item.PayType = recordPayType.value;
        item.Money = recordMoney.value;
        item.Memo = recordMemo.value;
      }
    });
    
    isEdit.value = false;
    totalMoney.value += parseInt(recordMoney.value);
    setAccountList(recordDate.value);
    getRecordList(editDate);
    modalStore.closeModal();
  }

function deleteRecordDetail(id) {
  totalMoney.value -= recordList.value.find((item) => item.id === id).Money
  recordList.value = recordList.value.filter((item) => item.id !== id);

  setAccountList(recordDate.value);
}

  function getRecordList(recordDate) {
    calendarStore.dateTable.map((item) => {
      if (item.date === recordDate) {
        recordList.value = item.accountList;
      }
    });
  }

  function getRecordDetail(id) {
    recordList.value.map((item) => {
      if (item.id === id) {
        recordDetailID.value = item.id;
        recordDate.value = item.date;
        recordConsumeType.value = item.ConsumeType;
        recordPayType.value = item.PayType;
        recordMoney.value = item.Money;
        recordMemo.value = item.Memo;
      }
    });
    isEdit.value = true
  }

  function setAccountList(date){
    calendarStore.dateTable.map((item) => {
      if (item.date === date) {
         item.accountList = recordList.value;
      }
    });
  }

  const optionConsumeType = ref([
    { value: "A", text: "??????" },
    { value: "B", text: "??????" },
    { value: "C", text: "??????" },
    { value: "D", text: "??????" },
    { value: "E", text: "??????" },
  ]);

  const optionPayType = ref([
    { value: "Money", text: "??????" },
    { value: "CreditCard", text: "?????????" },
    { value: "EasyCard", text: "?????????" },
  ]);

  return {
    recordDate,
    recordConsumeType,
    recordPayType,
    recordMoney,
    recordMemo,
    recordList,
    totalMoney,
    isEdit,
    optionConsumeType,
    optionPayType,
    setRecordDetail,
    getRecordDetail,
    editRecordDetail,
    deleteRecordDetail,
    getRecordList,
  };
});

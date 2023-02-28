<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useManageStore } from "../stores/manage.js";
const manageStore = useManageStore();
const { setRecordDetail, editRecordDetail } = manageStore;
const {
  recordDate,
  recordConsumeType,
  recordPayType,
  recordMoney,
  recordMemo,
  totalMoney,
  isEdit,
  optionConsumeType,
  optionPayType,
} = storeToRefs(manageStore);

// 金額格式
const moneyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div class="Record-Form">
      <h2>記帳本</h2>
      <div>
        <div class="Record-InputItem">
          <label for="record_ID">花費日期</label>
          <input
            id="record_ID"
            :disabled="isEdit"
            type="date"
            v-model="recordDate"
          />
        </div>
        <div class="Record-InputItem">
          <label for="record_consume">消費種類</label>
          <select id="record_consume" v-model="recordConsumeType">
            <option value="" disabled selected>請選擇</option>
            <option v-for="consume in optionConsumeType" :value="consume.value">
              {{ consume.text }}
            </option>
          </select>
        </div>
        <div class="Record-InputItem">
          <label class="form-label" for="record_pay">花費方式</label>
          <select id="record_pay" v-model="recordPayType">
            <option value="" disabled selected>請選擇</option>
            <option v-for="pay in optionPayType" :value="pay.value">
              {{ pay.text }}
            </option>
          </select>
        </div>
        <div class="Record-InputItem">
          <label for="record_money">花費金額</label>
          <input id="record_money" type="text" v-model="recordMoney" />
        </div>
        <div class="Record-InputItem">
          <label for="record_memo">備註</label>
          <input id="record_memo" type="text" v-model="recordMemo" />
        </div>

        <div class="Record-btn">
          <button type="button" v-if="isEdit" @click="editRecordDetail">
            修改
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary px-5 py-3"
            v-else
            @click="setRecordDetail"
          >
            新增
          </button>
        </div>
      </div>
    </div>
    <div class="Total-Money">
      <div>總金額：{{ moneyFormat.format(totalMoney) }} 元</div>
    </div>
  </div>
</template>

<style>
.Record-Form {
  width: 100%;
  height: 80%;
  padding: 1.5rem 2.5rem;
  color: black;
  border: none;
  border-radius: 30px;
  background-color: #ececec;
  display: flex;
  flex-direction: column;
}
.Record-Form h2 {
  width: 100%;
  font-size: 28px;
  font-weight: 700;
  margin: 2rem auto;
}
.Record-InputItem {
  width: 100%;
}
.Record-InputItem input,
select {
  width: 100%;
  font-size: 18px;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
}
.Record-InputItem label {
  font-size: 18px;
  font-weight: 700;
}
.Record-btn {
  width: 100%;
  margin-top: 2.5rem;
  display: flex;
  justify-content: end;
}
/* .Record-btn button {
  appearance: none;
  background-color: transparent;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3b3b3b;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 25%;
  will-change: transform;
}

.Record-btn button:disabled {
  pointer-events: none;
}

.Record-btn button:hover {
  color: #fff;
  background-color: #1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.Record-btn button:active {
  box-shadow: none;
  transform: translateY(0);
} */
.Total-Money {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
}
.Total-Money div {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  box-shadow: 3px 3px 12px rgba(255, 255, 255, 0.5);
  color: #3b3b3b;
  background-color: #ececec;
}
</style>

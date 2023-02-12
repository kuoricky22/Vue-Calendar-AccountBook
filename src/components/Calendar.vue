<script setup>
import { storeToRefs } from "pinia";
import { onMounted, computed } from "vue";
import { useCalendarStore } from "../stores/calendar.js";
import { useManageStore } from "../stores/manage.js";
const calendarStore = useCalendarStore();
const manageStore = useManageStore();
const { nextMonth, prevMonth, setMonthDays } = calendarStore;
const { getRecordDetail } = manageStore;
const { nowYear, nowMonth, weekName, dateTable } = storeToRefs(calendarStore);

onMounted(() => {
  setMonthDays();
});

const dateToString = computed(() => {
  return (date) => date.slice(8);
});
</script>

<template>
  <div class="calenderBox">
    <div class="calenderNavbar">
      <div>
        <span class="year-text">{{ nowYear }}</span>
        <span class="month-text">{{ nowMonth }}</span>
      </div>
      <div class="monthBtnbox">
        <button type="button" class="monthBtn" @click="prevMonth()">
          <svg
            class="monthIcon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button type="button" class="monthBtn" @click="nextMonth()">
          <svg
            class="monthIcon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
    <hr />
    <div class="weekBox">
      <div class="weekName" v-for="name in weekName">
        <div>{{ name }}</div>
      </div>
    </div>
    <div class="dateTable">
      <div class="dateBox" v-for="day in dateTable">
        <div class="dateItem">
          <div
            class="date"
            :class="{ today: day.today, 'gray-font': day.disable }"
            @click="getRecordDetail(day.date)"
          >
            {{ dateToString(day.date) }}
          </div>
          <div v-if="day.accountList.length != 0" class="hasDetail"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.calenderBox {
  width: 100%;
  height: 49.5%;
  margin-bottom: 1%;
  padding: 2.5rem 1.5rem;
  border-radius: 10px;
  background: #3c3c3c;
  box-shadow: 0 1px 3px 0 rgba(43, 42, 42, 0.1), 0 1px 2px 0 rgb(0 0 0 / 6%);
}
.calenderNavbar {
  display: flex;
  justify-content: space-between;
}
.year-text {
  color: #ffffff;
  font-size: 28px;
  font-weight: 800;
  margin-left: 0.75rem;
  margin-right: 1.125rem;
}
.month-text {
  color: #ffffff;
  font-size: 28px;
}
.monthBtnbox {
  display: flex;
  border-radius: 0.5rem;
  padding: 0.25rem 0.25rem;
}
.monthBtn {
  padding: 0.25rem;
  line-height: 1;
  align-items: center;
  background: #3c3c3c;
  border: none;
  color: #eee;
  display: inline-flex;
  cursor: pointer;
}
.monthIcon {
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: middle;
  display: inline-flex;
}
.dateTable {
  width: 100%;
  height: 85%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.dateBox {
  width: 100%;
  margin-top: 20px;
  color: #eee;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
}
.dateItem {
  width: 2rem;
  height: 2rem;
  text-align: center;
}
.hasDetail {
  width: 5px;
  height: 5px;
  margin: 0 auto;
  margin-top: 5px;
  background-color: #fff;
  border-radius: 50%;
}
.dateItem .date {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.weekBox {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.weekName {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.today {
  width: 100%;
  height: 100%;
  position: relative;
  color: #3c3c3c;
  z-index: 1;
}
.today::after {
  content: "";
  width: 100%;
  height: 100%;
  left: 1px;
  top: -2px;
  position: absolute;
  background: white;
  border-radius: 50%;
  z-index: -1;
}
.gray-font {
  color: #888;
}
</style>

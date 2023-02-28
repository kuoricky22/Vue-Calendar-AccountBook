<script setup>
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useManageStore } from "../stores/manage.js";
import { useModalStore } from "../stores/modal.js";

const manageStore = useManageStore();
const { getRecordDetail, deleteRecordDetail } = manageStore;
const { recordList } = storeToRefs(manageStore);

const modalStore = useModalStore();
const { showModal } = modalStore;

const hasData = ref(false);

// 金額格式
const moneyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

watch(recordList, (nV, oV) => {
  nV.length != 0 ? (hasData.value = true) : (hasData.value = false);
});
</script>

<template>
  <div class="Record-Box">
    <div class="Record-Item-Add text-end">
      <button
        class="btn btn-secondary"
        type="button"
        @click="showModal('Create')"
      >
        新增帳務
      </button>
    </div>
    <div v-if="hasData" v-for="(detail, index) in recordList">
      <div class="Record-Item" :class="'color-' + detail.ConsumeType">
        <div class="Record-head">
          <button class="close" @click="deleteRecordDetail(detail.id)"></button>
          第{{ index + 1 }}項
        </div>
        <div class="Record-main">
          <div class="Record-detail paytype">
            花費方式：{{ detail.PayType }}
          </div>
          <div class="Record-detail money">
            金額：{{ moneyFormat.format(detail.Money) }}元
          </div>
          <div class="Record-detail memo">備註：{{ detail.Memo }}</div>
          <div class="Record-detail">
            <button
              class="btn btn-success w-100"
              @click="showModal('Edit', detail.id)"
            >
              編輯
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="Record-NoData" v-else>
      <h2 style="color: #fcfcfc">查無資料</h2>
    </div>
  </div>
</template>

<style>
.Record-Box {
  width: 100%;
  height: 100%;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  background-color: #262626;
  overflow-y: scroll;
}
.Record-Box::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}
.Record-Box::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #403b4a;
}
.Record-Box .Record-NoData {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Record-Item {
  width: 100%;
  margin-top: 10px;
  padding: 1.5rem 1rem;
  border-radius: 10px;
  color: #ececce;
  font-size: 24px;
}
.Record-head {
  position: relative;
  text-align: center;
  font-size: 32px;
  border-bottom: 3px solid #2c2c2c;
}
.Record-main {
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas: "money money" "paytype paytype" "memo btn";
}

.Record-main .Record-detail {
  line-height: 3rem;
  font-weight: 500;
}
.Record-detail.money {
  grid-area: money;
}
.Record-detail.paytype {
  grid-area: paytype;
}
.Record-detail.memo {
  grid-area: memo;
}
.Record-detail.btn {
  text-align: end;
  grid-area: btn;
}
.Record-head .close {
  position: absolute;
  right: 0px;
  top: -26px;
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  opacity: 0.3;
  cursor: pointer;
}
.Record-head .close:hover {
  opacity: 1;
}
.Record-head .close:before,
.Record-head .close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 33px;
  width: 2px;
  background-color: #fff;
}
.Record-head .close:before {
  transform: rotate(45deg);
}
.Record-head .close:after {
  transform: rotate(-45deg);
}
.Record-Item.color-A {
  background: linear-gradient(45deg, #cc2b5e, #753a88);
}
.Record-Item.color-B {
  background: linear-gradient(45deg, #536976, #292e49);
}
.Record-Item.color-C {
  background: linear-gradient(45deg, #e65c00, #f9d423);
}
.Record-Item.color-D {
  background: linear-gradient(45deg, #16a085, #f4d03f);
}
.Record-Item.color-E {
  background: linear-gradient(45deg, #ff512f 25%, #dd2476 100%);
}
</style>

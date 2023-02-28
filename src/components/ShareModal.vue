<script setup>
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useModalStore } from "../stores/modal.js";
import { useManageStore } from "../stores/manage.js";

const modalStore = useModalStore();
const { closeModal } = modalStore;
const { show } = storeToRefs(modalStore);

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
</script>

<template>
  <div
    v-if="show"
    class="modal fade show d-block"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">記帳本</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal()"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="record_ID" class="form-label">花費日期</label>
            <input
              type="date"
              class="form-control"
              id="record_ID"
              :disabled="isEdit"
              v-model="recordDate"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="record_consume">消費種類</label>
            <select
              class="form-select"
              id="record_consume"
              v-model="recordConsumeType"
            >
              <option value="" disabled selected>請選擇</option>
              <option
                v-for="consume in optionConsumeType"
                :value="consume.value"
              >
                {{ consume.text }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label" for="record_consume">花費方式</label>
            <select
              class="form-select"
              id="record_consume"
              v-model="recordPayType"
            >
              <option value="" disabled selected>請選擇</option>
              <option v-for="pay in optionPayType" :value="pay.value">
                {{ pay.text }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="record_money" class="form-label">花費金額</label>
            <input
              type="text"
              class="form-control"
              id="record_money"
              placeholder="花費金額"
              v-model="recordMoney"
            />
          </div>
          <div class="mb-3">
            <label for="record_money" class="form-label">備註</label>
            <textarea
              type="text"
              class="form-control"
              id="record_money"
              placeholder="備註"
              v-model="recordMemo"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-primary px-4"
            @click="editRecordDetail"
            v-if="isEdit"
          >
            修改
          </button>
          <button
            type="button"
            class="btn btn-outline-primary px-4"
            @click="setRecordDetail"
            v-else
          >
            新增
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
